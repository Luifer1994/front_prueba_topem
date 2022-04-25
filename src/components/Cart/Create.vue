<template>
  <div class="col-lg-5 grid-margin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Buscar productos</h4>
        <input
          v-model="search"
          @keyup="getProducts()"
          type="text"
          class="form-control"
          placeholder="Buscar..."
        />
        <div v-if="!products" class="p-4 text-center">
          <p class="text-danger">Buscar productos a facrurar</p>
        </div>
        <div v-else class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>${{ formatPrice(product.price) }}</td>
                <td>
                  <button
                    v-if="verifyItem(product)"
                    @click="add(product)"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-cart-plus"></i>
                  </button>
                  <button
                    v-else
                    @click="add(product)"
                    class="btn btn-primary btn-sm"
                    disabled
                  >
                    <i class="fas fa-cart-plus"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createInstaceAxios } from "../../utils/instance";
//import Cart from
export default {
  name: "Create",
  data() {
    return {
      products: null,
      search: null,
    };
  },
  methods: {
    async getProducts() {
      const res = await createInstaceAxios.get(
        "products?search=" + this.search
      );
      this.products = res.data.data.data;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    add(product) {
      let item = new Object();
      item.id = product.id;
      item.name = product.name;
      item.price = product.price;
      item.quantity = 1;
      item.description = product.description;
      item.iva = product.iva;
      this.$store.dispatch("getProduct", item);
      this.emitter.emit("add");
    },

    verifyItem(product) {
      let resultado = this.$store.state.cart.find((item) => item.id === product.id);
      let exist = null;
      if (typeof resultado !== "undefined") {
         exist = false;
      } else {
        exist = true;
      }
      return exist;
    },
  },
};
</script>