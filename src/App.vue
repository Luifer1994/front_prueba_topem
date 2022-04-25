<template>
  <Nav v-if="$route.name !== 'login'"></nav>
  <div v-if="$route.name !== 'login'" class="container-fluid page-body-wrapper">
    <sidebar></sidebar>
    <router-view />
  </div>
   <router-view v-if="$route.name === 'login'"/>
</template>
<script>
import sidebar from "@/components/Sidebar";
import Nav from "./components/Nav.vue";
export default {
  components: {
    sidebar,
    Nav,
  },
};
</script>

