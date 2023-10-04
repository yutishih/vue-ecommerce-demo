export default {
  summaryFromCart(state: { cart: any[] }) {
    return state.cart.reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.price * item.quantity,
      0
    );
  },
};
