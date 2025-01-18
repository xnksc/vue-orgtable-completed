import { createRouter, createWebHistory } from "vue-router";
import TablePage from "../pages/TablePage.vue";

const routes = [
  {
    path: "/:page(\\d+)?",
    name: "TablePage",
    component: TablePage,
    props: (route) => ({ page: parseInt(route.params.page) || 1 }),
  },
  {
    path: "/",
    redirect: "/1",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/1",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
