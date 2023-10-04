import { type Module } from "vuex";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

const moduleCart: Module<typeof state, any> = {
  namespaced: true, // Turn on the namespace
  state,
  mutations,
  getters,
};

export default moduleCart;
