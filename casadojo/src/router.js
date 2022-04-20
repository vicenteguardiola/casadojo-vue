import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/perfiles",
    alias: "/",
    name: "perfiles",
    component: () => import("./components/PerfilesList")
  },

  {
  path: "/perfiles/:id",
  name: "perfil-details",
  component: () => import("./components/Perfil")
  },

  {
    path: "/perfiles/add",
    name: "perfil-add",
    component: () => import("./components/AddPerfil")
  },

  {
    path: "/recompensas",
    name: "recompensas",
    component: () => import("./components/RecompensasList")
  },

  {
  path: "/recompensas/:id",
  name: "recompensa-details",
  component: () => import("./components/Recompensa")
  },

  {
    path: "/recompensas/add",
    name: "recompensa-add",
    component: () => import("./components/AddRecompensa")
  },

  {
    path: "/logros",
    name: "logros",
    component: () => import("./components/LogrosList")
  },

  {
  path: "/logros/:id",
  name: "logro-details",
  component: () => import("./components/Logro")
},

  {
    path: "/logros/add",
    name: "logro-add",
    component: () => import("./components/AddLogro")
  }


];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
