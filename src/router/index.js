import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios";
import ClientsList from '../views/Clients/List.vue'
import ClientsCreate from '../views/Clients/Register.vue'
import Login from '../views/Login.vue'
import InvoicesCreate from '../views/Invoice/Create.vue'
import InvoicesList from '../views/Invoice/List.vue'
import InvoicesDetail from '../views/Invoice/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'invoice-list',
    component: InvoicesList
  },
  {
    path: '/invoice-create',
    name: 'invoice-create',
    component: InvoicesCreate
  },
  {
    path: '/invoice-detail/:id',
    name: 'invoice-detail',
    component: InvoicesDetail
  },
  {
    path: '/clients-list',
    name: 'clients-list',
    component: ClientsList
  },
  {
    path: '/clients-create',
    name: 'clients-create',
    component: ClientsCreate
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

async function validateSesion() {
  const urlApi = process.env.VUE_APP_URL_API;
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(urlApi + "validate-sesion", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data) {
      return true;
    }
  } catch (error) {
    if (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
      window.location.reload();
    }
  }
}

function existToken() {
  if (localStorage.getItem("token")) {
    return true;
  }
}

router.beforeEach((to, from, next) => {
  var isLogin = existToken();
  if (isLogin && validateSesion()) {
    next();
  } else {
    if (to.name === "login") {
      next();
    } else {
      next("login");
    }
  }
});

export default router
