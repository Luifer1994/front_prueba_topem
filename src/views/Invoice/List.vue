<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Listado de facturas</h4>
          <router-link to="/invoice-create" class="btn btn-primary text-right"
            >Crear nueva factura</router-link
          >
          <div class="my-2">
            <div class="row">
              <div class="col-12 col-md-6">
                <input
                  @keyup="getInvoices()"
                  v-model="search"
                  type="number"
                  class="form-control form-control-sm"
                  placeholder="Numero de factura..."
                />
              </div>
              <div class="col-6 col-md-4">
                <Datepicker
                  v-model="rangeDtae"
                  range
                  locale="es"
                  cancelText="Cancelar"
                  selectText="Ok"
                  placeholder="Seleccionar rango de fechas"
                  :enableTimePicker="false"
                ></Datepicker>
              </div>
              <div class="col-2 col-md-2">
                <button v-if="rangeDtae" @click="onDatepicker()" class="btn btn-danger">
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 text-center" v-if="!invoices.length">
            <p class="text-danger">No hay facuras creadas</p>
          </div>
          <div v-else>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CLIENTE</th>
                    <th>FECHA_CREACIÓN</th>
                    <th>TOTAL_IVA</th>
                    <th>SUB_TOTAL</th>
                    <th>TOTAL</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="invoice in invoices" :key="invoice.id">
                    <td>{{ invoice.id }}</td>
                    <td>
                      {{ invoice.name_client }} {{ invoice.last_name_client }}
                    </td>
                    <td>
                      {{ formatDate(invoice.created_at) }}
                    </td>
                    <td>$ {{ formatPrice(invoice.total_iva) }}</td>
                    <td>$ {{ formatPrice(invoice.sub_total) }}</td>
                    <td>$ {{ formatPrice(invoice.total) }}</td>
                    <td>
                      <button
                        class="btn btn-primary btn-sm"
                        @click="InvoiceDetail(invoice.id)"
                      >
                        Detalle
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-start">
              <div class="row">
                <div class="col">
                  <nav>
                    <ul class="pagination flex-wrap pagination-sm">
                      <li
                        class="page-item"
                        v-for="link in links"
                        :key="link"
                        :class="{ active: link.active == true }"
                      >
                        <a
                          @click="next(link.label)"
                          style="cursor: pointer"
                          class="page-link"
                          >{{ link.label }}</a
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="col">
                  <div class="btn-group">
                    <button
                      class="btn btn-primary btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {{ order }}
                    </button>
                    <div class="dropdown-menu">
                      <button @click="orderList('DESC')" class="dropdown-item">
                        DESC
                      </button>
                      <button @click="orderList('ASC')" class="dropdown-item">
                        ASC
                      </button>
                    </div>
                  </div>
                </div>
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
export default {
  name: "InvoicesList",

  data() {
    return {
      invoices: [],
      links: null,
      page: 1,
      limit: 10,
      order: "DESC",
      rangeDtae: null,
      dateInitial: "",
      dateFinish: "",
      search: "",
    };
  },
  components: {
    Datepicker,
  },
  mounted() {
    this.getInvoices();
  },
  methods: {
    async getInvoices(
      search = null,
      limit = null,
      page = null,
      order = null,
      dateInitial = null,
      dateFinish = null
    ) {
      if (search) {
        this.search = search;
      }
      if (limit) {
        this.limit = limit;
      }
      if (page) {
        this.page = page;
      }
      if (order) {
        this.order = order;
      }
      if (dateInitial) {
        this.dateInitial = dateInitial;
      }
      if (dateFinish) {
        this.dateFinish = dateFinish;
      }
      const res = await createInstaceAxios.get(
        "invoices?limit=" +
          this.limit +
          "&page=" +
          this.page +
          "&order=" +
          this.order +
          "&search=" +
          this.search +
          "&start_date=" +
          this.dateInitial +
          "&finish_date=" +
          this.dateFinish
      );
      this.invoices = res.data.data.data;
      this.links = res.data.data.links.slice(1, res.data.data.links.length - 1);
    },
    next(num) {
      this.getInvoices(
        this.search,
        this.limit,
        num,
        this.order,
        this.dateInitial,
        this.dateFinish
      );
    },
    orderList(order) {
      this.getInvoices(
        this.search,
        this.limit,
        this.page,
        order,
        this.dateInitial,
        this.dateFinish
      );
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
    InvoiceDetail(id) {
      this.$router.push({ path: "/invoice-detail/" + id });
    },
    onDatepicker() {
      const format = "YYYYMMDD";
      this.dateInitial = moment(this.rangeDtae[0]).format(format);
      this.dateFinish = moment(this.rangeDtae[1]).format(format);
      this.getInvoices(
        this.search,
        this.limit,
        this.page,
        this.order,
        this.dateInitial,
        this.dateFinish
      );
    },
  },
};
</script>