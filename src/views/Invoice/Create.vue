<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <Create></Create>
        <Cart></Cart>
      </div>
    </div>
  </div>
  <notifications />
</template>
<script>
import Create from "../../components/Cart/Create.vue";
import Cart from "../../components/Cart/Cart.vue"
export default {
  name: "InvoicesCreate",
  components:{
    Create,
    Cart
  },
};
</script>