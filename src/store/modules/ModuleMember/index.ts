import { type Module } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

const moduleMember: Module<typeof state, any> = {
  namespaced: true, // Turn on the namespace
  state,
  mutations,
  actions,
};

export default moduleMember;
