module.exports = function(seneca) {
  return async function(args){
    var cart = args.cart

    cart.entries = cart.entries.sort(function(a,b){
      if( a.inserted && b.inserted ) {
        return b.inserted - a.inserted
      }
      else if( a.footer ) {
        return 1
      }
      else if( b.footer ) {
        return -1
      }
      else {
        return 0
      }
    }

    var total = 0
    cart.entries.forEach(function(entry){
      if( _.isNumber(entry.price) ) {
        total+=entry.price
      }
    })
    cart.total = total

    seneca.log.debug('update/total',cart.id,'total:',cart.total,'size:',cart.entries.length)

    cart.modified = new Date()

    try {
      await cart.save$();
      return {cart: cart};
    } catch (err) {
      seneca.log.error(err);
    }
  }
}
