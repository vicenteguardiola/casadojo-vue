import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/perfiles",
    alias: "/",
    name: "perfiles",
    component: () => import("./components/PerfilesList")
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
    path: "/recompensas/add",
    name: "recompensa-add",
    component: () => import("./components/AddRecompensa")
  }


];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
