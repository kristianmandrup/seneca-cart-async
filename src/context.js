module.exports = function() {
  return {
    cart_ent: this.make('shop','cart'),
    product_ent: this.make('shop','product'),
    purchase_ent: this.make('shop','purchase'),
    add_count: 0,
    salestax_update: false    
  }
}
