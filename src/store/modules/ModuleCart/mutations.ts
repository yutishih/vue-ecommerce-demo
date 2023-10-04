const mutations = {
  addToCart(
    state: { cart: any[] },
    product: { id: any; size: any; quantity: any }
  ) {
    const item = state.cart.find(
      (item: { id: any; size: any }) =>
        item.id === product.id && item.size === product.size
    );
    if (item) {
      item.quantity += product.quantity;
    } else {
      state.cart.push({ ...product, quantity: product.quantity });
    }
  },
  incrementFromCart(state: { cart: any[] }, productId: any) {
    const item = state.cart.find((item: { id: any }) => item.id === productId);
    if (item) {
      item.quantity++;
    }
  },
  decrementFromCart(state: { cart: any[] }, productId: any) {
    const item = state.cart.find((item: { id: any }) => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.cart = state.cart.filter(
          (item: { id: any }) => item.id !== productId
        );
      }
    }
  },
  removeFromCart(state: { cart: any[] }, productId: any) {
    state.cart = state.cart.filter(
      (item: { id: any }) => item.id !== productId
    );
  },
  loadCart(state: { cart: any }, cart: any) {
    state.cart = cart;
  },
};

export default mutations;
