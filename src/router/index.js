import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import SuperIndex from '../components/SuperAdministrator/SuperIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex
    },
    {
      path: '/superIndex',
      name: 'SuperIndex',
      component: SuperIndex
    }
  ]
})
