import App from './App'
import router from './router'
import "vuetify/dist/vuetify.min.css";
// import "vuetify/src/stylus/main.styl";
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
