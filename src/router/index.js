import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import SuperIndex from '../components/SuperAdministrator/SuperIndex'
import FYLHome from '../components/home/FYLHome'
import FYLIndex from '../components/home/FYLIndex'
import XYSHome from '../components/SuperAdministrator/admin/XYSHome'
import FYLDiary from '../components/home/FYLDiary'
import FYLSelf from '../components/home/FYLSelf'
import FYLWechat from '../components/home/FYLWechat'
import UserManagement from '../components/SuperAdministrator/admin/SysManagement/UserManagement'

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
          component: XYSHome,
          children: [
            {
              path: '/fyl/xys/userManage',
              name: 'UserManagement',
              component: UserManagement,
              mate: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/fyl/diary',
          name: 'FYLDiary',
          component: FYLDiary
        },
        {
          path: '/fyl/self',
          name: 'FYLSelf',
          component: FYLSelf
        }, {
          path: '/fyl/wechat',
          name: 'FYLWechat',
          component: FYLWechat
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
    },
    {
      path: '/UserManagement',
      name: 'UserManagement',
      component: UserManagement
    }
  ]
})
