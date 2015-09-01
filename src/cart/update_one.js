module.exports = function(seneca) {
  return async function(args){
    var cart = args.cart

    var last = {}
    var newentries = []
    cart.entries = cart.entries || []
    cart.entries.forEach(function(entry){
      if( _.contains(options.onlyone,entry.category) ) {
        last[entry.category] = entry
      }
      else {
        newentries.push(entry)
      }
    })
    for( var category in last ) {
      newentries.push(last[category])
    }

    cart.entries = newentries
    cart.save$( function(err,cart){
      seneca.log.debug('update/onlyone',cart.id,_.keys(last))
      seneca.parent(args,cb)
    })
  }
}
