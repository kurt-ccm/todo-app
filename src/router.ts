import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import TodoInputForm from './pages/TodoInputForm.vue'
import TodoDetails from './pages/TodoDetails.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/input', component: TodoInputForm},
    {path: '/details/:id', component: TodoDetails}
]

const router = createRouter({ history: createWebHistory(), routes});

export default router;