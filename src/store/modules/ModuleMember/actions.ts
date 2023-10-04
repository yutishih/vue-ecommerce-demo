const actions = {
  login({ commit }: any, user: any) {
    commit("setUser", user);
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout({ commit }: any) {
    commit("setUser", null);
    localStorage.removeItem("user");
  },
};

export default actions;
