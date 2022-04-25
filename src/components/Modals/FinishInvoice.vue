<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Finalizar facturación
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h3>Introduce los datos del cliente</h3>
          <div class="form-group">
            <label for="exampleSelectGender">Tipo de documento</label>
            <select
              class="custom-select"
               :class="{  'is-invalid':errors.document_type_id }"
              v-model="client.document_type_id"
            >
              <option
                v-for="type in typeDocuments"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
            <small v-if="errors.document_type_id" class="text-danger">{{errors.document_type_id[0]}}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Numero de documento</label>
            <input
              @keyup="getByDocumentTypeAndNumber()"
              type="number"
              class="form-control"
              placeholder="Documento..."
              :class="{  'is-invalid':errors.document_number }"
              v-model="client.document_number"
            />
             <small v-if="errors.document_number" class="text-danger">{{errors.document_number[0]}}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Nombres</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nombres..."
              :class="{  'is-invalid':errors.name }"
              v-model="client.name"
            />
             <small v-if="errors.name" class="text-danger">{{errors.name[0]}}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Apellidos</label>
            <input
              type="text"
              class="form-control"
              placeholder="Apellidos..."
              v-model="client.last_name"
                :class="{  'is-invalid':errors.last_name }"
            />
              <small v-if="errors.last_name" class="text-danger">{{errors.last_name[0]}}</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Cancelar
          </button>
          <button @click="regsiterInvoice()" type="button" class="btn btn-primary" v-if="client.id" data-dismiss="modal">
            Facturar
          </button>
          <button
            @click="regsiterClient()"
            type="button"
            class="btn btn-primary"
            v-else
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createInstaceAxios } from "../../utils/instance";
export default {
  name: "FinishInvoice",
  props: {
    dataInvoice: {
      type: Object,
    },
  },
  data() {
    return {
      typeDocuments: [],
      client: {
        id: 0,
        name: null,
        document_type_id: null,
        last_name: null,
        document_number: null,
      },
      errors:{},
      amount: {
        total: 0,
        totalIva:0,
        subTotal:0,
      },
    };
  },
  mounted() {
    this.chargeData();
  },
  methods: {
    async chargeData() {
      await this.getTypeDocuments();
      this.amount = this.dataInvoice;
    },
    async getTypeDocuments() {
      const res = await createInstaceAxios.get("document-types");
      this.typeDocuments = res.data.data;
    },
    async getByDocumentTypeAndNumber() {
      const res = await createInstaceAxios.get(
        "clients-by-document?document_type_id=" +
          this.client.document_type_id +
          "&document_number=" +
          this.client.document_number
      );
      if (res.data.data) {
        this.client = res.data.data;
      }else {
        this.client.id=0;
        this.client.name=null;
        this.client.last_name=null;
      }
    },
    async regsiterClient() {
      try {
        const res = await createInstaceAxios.post("clients",this.client);
        this.client=res.data.data;
        this.amount = this.dataInvoice;
      } catch (er) {
        this.errors=er.response.data
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async regsiterInvoice() {
      try {
        let data = new Object();
        data.client_id  = this.client.id
        data.products   = this.dataInvoice.product
        data.sub_total  = this.dataInvoice.subTotal
        data.total_iva  = this.dataInvoice.totalIva
        data.total      = this.dataInvoice.total
        const res = await createInstaceAxios.post("invoices",data);
        if (res.data.res) {
          this.$notify({
          title: "Exito",
          text: res.data.message,
          type: "success",
        }); 
        this.emitter.emit("remove");
        this.$router.push("/");
        }
      } catch (er) {
        console.log(er.response.data);
      }
    }
  },
};
</script>