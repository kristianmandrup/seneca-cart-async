//{required$:['cart'],object$:['cart']},
module.exports = function(seneca) {
  return async function(args) {
    var cart = args.cart
    if( !cart ) {
      this.act({role:name,cmd:'create'}, async function(out){
        try {
          await do_product(out.cart);
        } catch(err) {
          seneca.log.error(err);
        }
      })
    } else do_product(cart)


  function do_product( cart ) {
    var product = args.product

    if( !product ) {
      product_ent.load$({code:args.code},function(err,product){
        if( err ) return done(err);
        do_add(product)
      })
    }
    else do_add(product);

    function do_add(product) {
      var entry = _.extend({},product.data$(false))

      // entry fields that can be overwritten
      entry.sort = 1000*(new Date().getTime()%1000000000)+(add_count++)
      entry.quantity = 1

      // custom and overwrite
      _.each( seneca.util.clean(_.omit(args, ['role','cmd','cart'])), function(v,k){
        entry[k]=v
      })

      // controlled fields
      entry.id = nid()
      entry.type = 'product'

      seneca.log.debug('add/product',cart.id,entry)
      cart.entries.push(entry)
      seneca.act({role:name,trigger:'update',cart:cart},done)
    }
  }
}
