import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import goTo from "vuetify/es5/services/goto";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Todo',
        component: Todo
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${ process.env.VUE_APP_TITLE } | ${ to.name }`
    next()
})

router.afterEach(() => {
    goTo(0, { duration: 0 })
})

export default router
