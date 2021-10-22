import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage'
import Login from '../components/Login'
import Password from '../components/Password'
import Branch from '../components/Branch'
import BranchTable from '../components/BranchTable'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Password',
        name: 'Password',
        component: Password
    },  
    {
        path: '/Branch',
        name: 'Branch',
        component: Branch
    },
    {
        path: '/BranchTable',
        name: 'BranchTable',
        component: BranchTable
    } 
];
const router = new VueRouter({
    routes,
    mode: 'history',
});
export default router;