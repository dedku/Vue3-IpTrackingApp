import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home.vue'

type Meta = {
    title: string
}

type Routes = {
    path: string,
    name: string,
    component: typeof Home,
    meta: Meta
}

const routes: Routes[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'IP Adress Teacker'
        }

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next()
})

export default router