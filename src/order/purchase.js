module.exports = function(seneca) {
  async function(args){
    var cart = args.cart

    var purchase = purchase_ent.make$()
    purchase.created = purchase.modified = new Date()
    purchase.cart = cart.id

    // TODO: need to be able to set set fields as will add product entry

    // this is not really satisfactory as we might want to search on purchaser email address etc
    purchase.data = cart.data$()
    purchase.buyer = args.buyer

    try {
      var purchase = await purchase.save$();
      cart.status = 'closed'
      var cart = await cart.save$();
      seneca.log.debug('purchase',purchase.id,'cart:',cart.id,'total:',cart.total,'size:',cart.entries.length,'buyer',purchase.buyer)
      return {cart:cart,purchase:purchase};
    } catch (err) {
      seneca.log.error(err);
    }
  }
}
