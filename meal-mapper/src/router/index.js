import Vue from 'vue'
import Router from 'vue-router'
import FAQ from '../components/FAQ.vue'

Vue.use(Router)

export default new Router({
  routes: [{ path: '/:district/faqs', component: FAQ, props: true }]
})
