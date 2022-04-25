<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="card">
        <div class="card-body">
          <div class="row">
           
            <div
              class="
                col-md-12 col-xl-4
                d-flex
                flex-column
                justify-content-start
              "
            >
              <div class="ml-xl-4 mt-3">
                <p class="card-title">
                  Detalles de facrura N° {{ this.$route.params.id }}
                </p>
                <p>Fecha de creación</p>
                <h3 class="text-primary">
                  {{ formatDate(invoice.created_at) }}
                </h3>
                <p>Cliente</p>
                <h2
                  class="font-weight-500 mb-xl-4 text-primary text-capitalize"
                >
                  {{ invoice.client_name }} {{ invoice.last_name_client }}
                </h2>
                <h5>
                  {{ invoice.document_type }}
                  {{ invoice.document_number_client }}
                </h5>
                <p>Vendedor</p>
                <h2
                  class="font-weight-500 mb-xl-4 text-primary text-capitalize"
                >
                  {{ invoice.official }}
                </h2>
                <p>Compañia</p>
                <h2
                  class="font-weight-500 mb-xl-4 text-primary text-capitalize"
                >
                  {{ invoice.name_company }}
                </h2>
                <h5>Nit {{ invoice.nit_company }}</h5>
              </div>
            </div>

            <div
              class="
                col-md-12 col-xl-3
                d-flex
                flex-column
                justify-content-start
              "
            >
              <div class="ml-xl-4 mt-3">
                <br /><br />
                <p>Productos facturados</p>
                <div v-for="line in invoice.invoice_lines" :key="line.id">
                  <h3 class="text-primary">{{line.name}}</h3>
                  <p>Cantidad</p>
                  <p> {{line.quantity}}</p>
                  <p>Precio unitario</p>
                  <h5>$ {{formatPrice(line.price)}}</h5>
                  <p>Total</p>
                  <h5>$ {{formatPrice(line.price*line.quantity)}}</h5>
                </div>
              </div>    
            </div>
             <div
              class="
                col-md-12 col-xl-3
                d-flex
                flex-column
                justify-content-start
              "
            >
              <div class="ml-xl-4 mt-3">
                <br><br>
                <p>Total iva</p>
                <h2 class="text-primary">
                  $ {{ formatPrice(invoice.total_iva) }}
                </h2>
                <p>Sub total</p>
                <h2 class="text-primary">
                  $ {{ formatPrice(invoice.sub_total) }}
                </h2>
                <p>Total pagado</p>
                <h2 class="text-primary">$ {{ formatPrice(invoice.total) }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createInstaceAxios } from "../../utils/instance";
import moment from "moment";
export default {
  name: "InvoiceDetail",
  data() {
    return {
      invoice: {
        total: 0,
        total_iva: 0,
        sub_total: 0,
        client: null,
        invoice_lines: [
          {
            product: null,
          },
        ],
      },
      products: [],
    };
  },
  mounted() {
    this.getInvoice();
  },
  methods: {
    async getInvoice() {
      const res = await createInstaceAxios.get(
        "invoices/" + this.$route.params.id
      );
      this.invoice = res.data.data;
      this.getInforProduct();
    },
    async getInforProduct() {
      for (let index = 0; index < this.invoice.invoice_lines.length; index++) {
        const res = await createInstaceAxios.get(
          "products/" + this.invoice.invoice_lines[index].product_id
        );
        this.invoice.invoice_lines[index].name = res.data.data.name;
         this.invoice.invoice_lines[index].price = res.data.data.price;
      }
    },
    formatDate(value) {
      moment.locale("es");
      if (value) {
        return moment(String(value)).format("LL");
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>