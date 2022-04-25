<template>
  <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div
      class="
        text-center
        navbar-brand-wrapper
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <img
      style="max-width:120px; min-width:50px"
        src="https://topem.com.co/wp-content/uploads/2021/06/Recurso-1.png"
        alt="logo"
      />
    </div>
    <div
      class="navbar-menu-wrapper d-flex align-items-center justify-content-end"
    >
      <button
        class="navbar-toggler navbar-toggler align-self-center"
        type="button"
        data-toggle="minimize"
      >
        <span class="icon-menu"></span>
      </button>
      <!-- <ul class="navbar-nav mr-lg-2">
          <li class="nav-item nav-search d-none d-lg-block">
            <div class="input-group">
              <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span class="input-group-text" id="search">
                  <i class="icon-search"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search">
            </div>
          </li>
        </ul> -->
      <ul class="navbar-nav navbar-nav-right">
        <li class="nav-item nav-profile dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            id="profileDropdown"
          >
            <img
              src="https://img.icons8.com/color/48/000000/user.png"
              alt="profile"
            />
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="profileDropdown"
          >
            <a class="dropdown-item">
              <i class="ti-settings text-primary"></i>
              Settings
            </a>
            <a class="dropdown-item" @click="logout()">
              <i class="ti-power-off text-primary"></i>
              Salir
            </a>
          </div>
        </li>
        <li class="nav-item nav-settings d-none d-lg-flex">
          <a class="nav-link" href="#">
            <i class="icon-ellipsis"></i>
          </a>
        </li>
      </ul>
      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button"
        data-toggle="offcanvas"
      >
        <span class="icon-menu"></span>
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
