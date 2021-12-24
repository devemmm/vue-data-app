import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import DataView from "@/pages/DataView.vue";
import EditPage from "@/pages/EditPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DataView,
  },
  {
    path: "/update/:id",
    component: EditPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
