import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Material from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import VueCarousel from 'vue-carousel';
import Carousel3d from 'vue-carousel-3d';
import VueYoutube from 'vue-youtube'
import 'animate.css'

Vue.use(Material)
Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.use(Carousel3d)
Vue.use(VueYoutube)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
