<template>
  <div class="main-panel">
    <div class="content-wrapper table-responsive">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Clientes</h4>
          <router-link to="/clients-create" class="btn btn-primary text-right"
            >Registrar cliente</router-link
          >
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TYPO_DOCUMENTO</th>
                  <th>NUM_DOCUMENTO</th>
                  <th>NOMBRE</th>
                  <th>APELLIDO</th>
                  <th>CANT_FACTURAS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.document_type }}</td>
                  <td>{{ user.document_number }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.invoices_count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createInstaceAxios } from "../../utils/instance";
export default {
  name: "Users",
  data() {
    return {
      users: null,
      links: null,
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers(limit = null, page = null) {
      if (limit) {
        this.limit = limit;
      }
      if (page) {
        this.page = page;
      }
      const res = await createInstaceAxios.get(
        "clients?limit=" + this.limit + "&page=" + this.page
      );
      this.users = res.data.data.data;
      this.links = res.data.data.links.slice(1, res.data.data.links.length - 1);
    },
    next(num) {
      this.getUsers(this.limit, num);
    },
  },
};
</script>
