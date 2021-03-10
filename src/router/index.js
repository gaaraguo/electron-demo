import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'
import Login from '@/page/Login'
import Default from '@/page/Default'
import Main from '@/page/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      meta:{title: '默认'},
      component: Default
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      meta:{title: 'hello'},
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      meta:{title: '登录界面'},
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      meta:{title: '主界面'},
      component: Main
    }
  ]
})
