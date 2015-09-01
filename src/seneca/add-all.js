module.exports = function() {
  // create a new empty cart, args can contain custom values
  // but id,created,modified,entries,total,status are set by this plugin
  this.add({role:name,cmd:'create'}, require('./entry/create')(this))
  // adds entry based on product data
  // adds entry fields id, type, sort
  // does not save cart, rather calls trigger:update action
  this.add({role:name, cmd:'add_entry'}, require('./entry/add')(this));
  // removes an entry by id
  // cals trigger:update action
  this.add({role:name,cmd:'remove_entry'}, require('./entry/remove')(this))

  this.add({role:name,trigger:'update'}, require('./cart/update')(this))


  // get cart entity from cart id via ensure_entity wrapper
  // also for http api
  this.add({role:name,cmd:'get'}, require('./cart/get')(this))


  this.add({role:name,cmd:'purchase'}, require('./order/purchase')(this))


  // TODO: needs more work
  this.add({role:name,cmd:'complete'}, require('./order/complete')(this))

  this.add({init:name}, function( args, done ){
    this.act('role:util, cmd:define_sys_entity', {list:[
      cart_ent,
      product_ent,
      purchase_ent
    ]})

    done()
  })
}
