import { createStore } from "vuex";
import moduleCart from "./modules/ModuleCart";
import moduleMember from "./modules/ModuleMember";

const store = createStore({
  modules: {
    moduleCart,
    moduleMember,
  },
});

export default store;
