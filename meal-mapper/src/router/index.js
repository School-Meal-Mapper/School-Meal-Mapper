import Vue from 'vue'
import Router from 'vue-router'
import FAQ from '../components/FAQ.vue'
import Test from '../components/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/test', component: Test },
    { path: '/faqs', component: FAQ }
  ]
})
