type UserState = {
  user: {
    email: null | string;
    token: null | string;
    isLoggedIn: boolean;
  };
};

const mutations = {
  setUser(state: UserState, user: any) {
    if (user && user.email && user.token) {
      state.user.email = user.email;
      state.user.token = user.token;
      state.user.isLoggedIn = true;
    } else {
      state.user.email = null;
      state.user.token = null;
      state.user.isLoggedIn = false;
    }
  },
};

export default mutations;
