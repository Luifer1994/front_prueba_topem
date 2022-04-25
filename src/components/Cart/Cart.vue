<template>
  <div class="col-lg-7 grid-margin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Detalles de factura</h4>
        <p class="card-description">Productos agregados</p>

        <div class="table-responsive">
          <table v-if="products.length > 0" class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>PRECIO UNI</th>
                <th>IVA</th>
                <th>CANT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>${{ formatPrice(product.price) }}</td>
                <td>${{ calculateIva(product) }}</td>
                <td>
                  <button
                    @click="subtractQuantity(product)"
                    class="btn btn-danger btn-sm"
                  >
                    -
                  </button>
                  {{ product.quantity }}
                  <button
                    @click="addQuantity(product)"
                    class="btn btn-primary btn-sm"
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    @click="remove(product)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right" v-if="Object.keys(products).length">
          <h5>Total iva : $ {{ formatPrice(totalIva) }}</h5>
          <h5>Sub Total : $ {{ formatPrice(subTotal) }}</h5>
          <h4>Total a pagar: $ {{ formatPrice(total) }}</h4>
          <button @click="cancel()" class="btn btn-danger m-2">Cancelar</button>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#staticBackdrop"
          >
            Facturar
          </button>
        </div>
      </div>
    </div>
  </div>
  <FinishInvoice :dataInvoice="dataSend"></FinishInvoice>
  <notifications />
</template>
<script>
import FinishInvoice from "../Modals/FinishInvoice.vue";
export default {
  name: "Cart",
  data() {
    return {
      products: {},
      quantitys: [],
      total: null,
      totalIva: 0,
      subTotal: 0,
      quantity: 0,
      dataSend:null
    };
  },
  components: {
    FinishInvoice,
  },
  mounted() {
    this.getProducts();
    this.emitter.on("add", () => {
      this.getProducts();
    });
    this.emitter.on("remove", () => {
      this.cancel();
    });
  },
  methods: {
    getProducts() {
      this.resetValues();
      this.products = this.$store.state.cart;
      this.products.forEach((element) => {
        if (element.iva) {
          this.totalIva += element.price * 0.19 * element.quantity;
        }
        this.subTotal += element.price * element.quantity;
      });
      this.total = this.subTotal + this.totalIva;
      let dataFinish      = new Object();
      dataFinish.product  = this.products
      dataFinish.total    = this.total
      dataFinish.subTotal = this.subTotal
      dataFinish.totalIva = this.totalIva
      this.dataSend       = dataFinish
    },
    update(item) {
      this.$store.dispatch("getProduct", item);
      this.getProducts();
    },
    remove(product) {
      this.$store.commit("remove", product);
      this.getProducts();
    },
    subtractQuantity(product) {
      if (product.quantity !== 1) {
        product.quantity = product.quantity - 1;
        this.update(product);
      } else {
        this.$notify({
          title: "⚠",
          text: "La cantidad mínima por producto es 1",
          type: "error",
        });
      }
    },
    addQuantity(product) {
      product.quantity = product.quantity + 1;
      this.update(product);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    calculateIva(product) {
      let iva = 0;
      if (product.iva) {
        iva = product.price * 0.19;
      }
      return this.formatPrice(iva);
    },
    cancel() {
      this.$store.state.cart.forEach((element) => {
        this.remove(element);
      });
    },
    resetValues() {
      this.total = 0;
      this.totalIva = 0;
      this.subTotal = 0;
      this.quantity = 0;
    },
  },
};
</script>