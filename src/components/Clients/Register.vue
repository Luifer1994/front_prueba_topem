<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="exampleSelectGender">Tipo de documento</label>
        <select
          class="custom-select"
          :class="{ 'is-invalid': errors.document_type_id }"
          v-model="client.document_type_id"
        >
          <option v-for="type in typeDocuments" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
        <small v-if="errors.document_type_id" class="text-danger">{{
          errors.document_type_id[0]
        }}</small>
      </div>
      <div class="form-group col-md-6">
        <label for="exampleInputName1">Numero de documento</label>
        <input
          type="number"
          class="form-control"
          placeholder="Documento..."
          :class="{ 'is-invalid': errors.document_number }"
          v-model="client.document_number"
        />
        <small v-if="errors.document_number" class="text-danger">{{
          errors.document_number[0]
        }}</small>
      </div>
      <div class="form-group col-md-6">
         <label for="exampleInputName1">Nombres</label>
    <input
      type="text"
      class="form-control"
      placeholder="Nombres..."
      :class="{ 'is-invalid': errors.name }"
      v-model="client.name"
    />
    <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
  
      </div>
       <div class="form-group col-md-6">
         <label for="exampleInputName1">Apellidos</label>
    <input
      type="text"
      class="form-control"
      placeholder="Apellidos..."
      v-model="client.last_name"
      :class="{ 'is-invalid': errors.last_name }"
    />
    <small v-if="errors.last_name" class="text-danger">{{
      errors.last_name[0]
    }}</small>
      </div>
    </div>
  </form>
  <router-link to="/clients-list"  type="button" class="btn btn-danger">
    Cancelar
  </router-link>
  <button @click="regsiterClient()" type="button" class="btn btn-primary mx-2">
    Registrar
  </button>
</template>
<script>
import { createInstaceAxios } from "../../utils/instance";
export default {
  data() {
    return {
      typeDocuments: [],
      client: {
        name: null,
        document_type_id: null,
        last_name: null,
        document_number: null,
      },
      errors: {},
    };
  },
  mounted() {
    this.getTypeDocuments();
  },
  methods: {
    async regsiterClient() {
      try {
        const res = await createInstaceAxios.post("clients", this.client);
        if (res.data.res) {
          this.$router.push('clients-list')
        }
      } catch (er) {
        this.errors = er.response.data;
      }
    },
    async getTypeDocuments() {
      const res = await createInstaceAxios.get("document-types");
      this.typeDocuments = res.data.data;
    },
  },
};
</script>