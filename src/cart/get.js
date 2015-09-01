module.exports = function(seneca) {
  return async function(args) {
    var create = void 0 == args.create || args.create;
    if( args.cart || !create ) {
      return {cart: args.cart};
    }
    else {
      return await this.act({role:name, cmd:'create'})
    }
  }
}
