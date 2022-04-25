<template>
  <div class="main-panel">
    <div class="content-wrapper table-responsive">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Regsitrar cliente</h4>
          <FormClient></FormClient>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormClient from "../../components/Clients/Register.vue";
export default {
  name: "RegisterCliente",
  components: {
    FormClient,
  },
};
</script>