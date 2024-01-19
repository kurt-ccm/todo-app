import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import TodoInputForm from './pages/TodoInputForm.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/input', component: TodoInputForm}
]

const router = createRouter({ history: createWebHistory(), routes});

export default router;