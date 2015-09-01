module.exports = function(seneca) {
  return async function(args){
    var cart = args.cart

    var removed_entry
    cart.entries = _.filter(cart.entries, function(entry){
      if( entry.id == args.entry ) {
        removed_entry = entry
        return false
      }
      else return true
    })

    seneca.log.debug('remove/entry', cart.id,'entry:', args.entry, removed_entry)
    try {
      return await seneca.act({role:name, trigger:'update', cart:cart});
    } catch (err) {
      seneca.log.error(err);
    }
  }
}
