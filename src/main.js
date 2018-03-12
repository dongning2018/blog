import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

import App from 'src/App'
import Rest from 'src/rest'
import Event from 'src/event'
import NProgress from 'nprogress'

import login from 'components/Login'
import reg from 'components/Reg'
import user from 'components/User'
import userArticleList from 'components/UserArticleList'
import userCategoryArticleList from 'components/UserCategoryArticleList'
import userAbout from 'components/UserAbout'
import userContact from 'components/UserContact'
import userArticle from 'components/UserArticle'
import admin from 'components/Admin'
import adminArticleList from 'components/AdminArticleList'
import adminAddArticle from 'components/AdminAddArticle'
import adminCategory from 'components/AdminCategory'
import adminAddCategory from 'components/AdminAddCategory'
import resetPassword from 'components/ResetPassword'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(Notifications)
Vue.prototype.$http = Rest
Vue.prototype.$nprogress = NProgress

export const emitter = new Event()

//routes config
const routes = [
  { path: '/', redirect: '/userArticleList' },
  { path: '/login', component: login, name: 'login' },
  { path: '/reg', component: reg, name: 'reg' },
  {
    path: '/user',
    component: user,
    children: [
      {
        path: '/userArticleList',
        component: userArticleList,
        name: '/userArticleList'
      },
      {
        path: '/userCategoryArticleList',
        component: userCategoryArticleList,
        name: 'userCategoryArticleList'
      },
      { path: '/userArticle', component: userArticle, name: 'userArticle' },
      { path: '/userAbout', component: userAbout, name: 'userAbout' },
      { path: '/userContact', component: userContact, name: 'userContact' }
    ]
  },
  {
    path: '/admin',
    component: admin,
    children: [
      {
        path: '/adminArticleList',
        component: adminArticleList,
        name: 'adminArticleList'
      },
      {
        path: '/adminAddArticle',
        component: adminAddArticle,
        name: 'adminAddArticle'
      },
      {
        path: '/adminCategory',
        component: adminCategory,
        name: 'adminCategory'
      },
      {
        path: '/adminAddCategory',
        component: adminAddCategory,
        name: 'adminAddCategory'
      },
      {
        path: '/resetPassword',
        component: resetPassword,
        name: 'resetPassword'
      }
    ]
  }
]

//genartor VueRouter object
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  emitter.emit('start')
  next()
})

router.afterEach(() => {
  emitter.emit('stop')
})

//bind and render
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // render: h => h(App)
})
