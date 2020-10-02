import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/components/Results.vue'
import AboutUs from '@/components/AboutUs.vue'
import BlmStatement from '@/components/BlmStatement.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/blm-statement',
      name: 'BlmStatement',
      component: BlmStatement
    },
    {
      path: '/:need',
      name: 'Results',
      component: Results,
      props: true
    }
  ]
})
