import cart from '../../src/seneca-cart-async';

describe('cart', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(cart, 'greet');
      cart.greet();
    });

    it('should have been run once', () => {
      expect(cart.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(cart.greet).to.have.always.returned('hello');
    });
  });
});
