module.exports = function(ctx) {
  // ensure args.{cart,product,purchase} is a valid entity
  // loads ent if value is just an id
  this.act({
    role: 'util',
    cmd: 'ensure_entity',
    pin: {
      role: 'cart',
      cmd:'*'
    },
    entmap:{
      cart: ctx.cart_ent,
      product: ctx.product_ent,
      purchase: ctx.purchase_ent
    }
  })

  this.act({
    role: 'web',
    use: require('./web-use')(ctx)
  })
}
