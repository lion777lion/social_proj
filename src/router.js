import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthForm from './components/AuthForm.vue';
import NewPost from './components/NewPost/NewPost.vue';
import AppLayout from './components/AppLayout.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'AuthForm',
        component: AuthForm
    },
    {
        path: '/app',
        name: 'AppLayout',
        component: AppLayout, 
    },
    {
        path: '/newpost',
        name: 'NewPost',
        component: NewPost,
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;