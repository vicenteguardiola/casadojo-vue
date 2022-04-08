import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/perfiles",
    name: "perfiles",
    component: () => import("./components/PerfilesList")
  },

  {
    path: "/perfiles/add",
    name: "perfil-add",
    component: () => import("./components/AddPerfil")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
