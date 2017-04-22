import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Quiz from '@/components/Quiz'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    }
  ]
})
