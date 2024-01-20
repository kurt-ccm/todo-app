import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import TodoInputForm from "./pages/TodoInputForm.vue";
import TodoDetails from "./pages/TodoDetails.vue";
import ErrorPage from "./pages/ErrorPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/input", component: TodoInputForm },
  {
    path: "/details/:id",
    name: "details",
    component: TodoDetails,
    props: true,
  },
  { path: "/:pathMatch(.*)*", component: ErrorPage },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
