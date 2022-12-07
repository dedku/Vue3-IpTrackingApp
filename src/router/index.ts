import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home.vue'

type Routes = {
    path: string,
    name: string,
    component: typeof Home
}

const routes: Routes[] = [
    { path: '/', name: 'Home', component: Home }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router