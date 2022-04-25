import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";

export default createStore({
  state() {
    return {
      user: null,
      cart: [],
    };
  },
  mutations: {
    userLogin(state, user) {
      state.user = user;
    },
    RESET_USER(state) {
      state.user = null;
    },
    addToCart(state, product) {
      if (state.cart.length < 1) {
        state.cart.push(product);
      } else {
        let resultado = state.cart.find((item) => item.id === product.id);
        if (typeof resultado !== "undefined") {
          for (let index = 0; index < state.cart.length; index++) {
            if (state.cart[index].id === product.id) {
              //product.quantity = state.cart[index].quantity + product.quantity
              state.cart[index] = product;
            }
          }
        } else {
          state.cart.push(product);
        }
      }
    },
    remove(state, product) {
      var newCart = state.cart.filter((item) => item.id !== product.id);
      state.cart = newCart;
    },
  },
  actions: {
    async logout({ commit }) {
      let response;
      const urlApi = process.env.VUE_APP_URL_API;
      const token = localStorage.getItem("token");
      try {
        response = await axios.get(urlApi + "user-logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        if (response.data.res && localStorage.getItem("token")) {
          commit("RESET_USER");
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (ex) {
        // Handle error
        console.log(ex);
        localStorage.removeItem("token");
      }
    },
    getProduct({ commit }, product) {
      commit("addToCart", product);
    },
  },
  plugins: [new VuexPersistence().plugin],
});
