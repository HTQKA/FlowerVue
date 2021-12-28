import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import SuperIndex from '../components/SuperAdministrator/SuperIndex'
import FYLHome from '../components/home/FYLHome'
import FYLIndex from '../components/home/FYLIndex'
import XYSHome from '../components/SuperAdministrator/admin/XYSHome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/fyl/home',
      name: 'FYLHome',
      component: FYLHome,
      children: [
        {
          path: '/fyl/index',
          name: 'FYLIndex',
          component: FYLIndex
        },
        {
          path: '/fyl/xys/home',
          name: 'XYSHome',
          component: XYSHome
        }
      ]
    },
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
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/superIndex',
      name: 'SuperIndex',
      component: SuperIndex
    }
  ]
})
