// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import MainChart from './components/MainChart.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {path: '/', 
      component: MainChart}
    ]
  });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: `
  <div id="app">
    <router-view></router-view>
  </div>
  `
}).$mount('#app')
