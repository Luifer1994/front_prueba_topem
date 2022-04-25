<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <i class="icon-paper menu-icon"></i>
          <span class="menu-title">Facturas</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/clients-list" class="nav-link">
          <i class="icon-head menu-icon"></i>
          <span class="menu-title">Clientes</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Sidebar",
};
</script>
<style>
a.router-link-exact-active {
  background-color: rgba(19, 18, 18, 0.13);
}
</style>
