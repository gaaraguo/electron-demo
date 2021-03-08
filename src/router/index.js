import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Default from '@/components/Default'
import Main from '@/components/Main'
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
