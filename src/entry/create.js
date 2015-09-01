module.exports = function(seneca) {
  return async function(args) {
    var cart = cart_ent.make$()
    cart.created = cart.modified = new Date()
    cart.entries = []
    cart.total = 0
    cart.status = 'open'

    _.each( seneca.util.clean(_.omit(args, ['role','cmd','cart','id','created','modified','entries','total','status'])), function(v,k){
      cart[k]=v;
    })

    try {
      await cart.save$();
      seneca.log.debug('create', cart.id);
      return {cart: cart};
    } catch (err) {
      seneca.log.error(err);
    }
  }
}
