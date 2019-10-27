import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDnpKi7Lqsb7-NatOEToauocXW_XKNwSvI',
  authDomain: 'to-do-list-521ae.firebaseapp.com',
  databaseURL: 'https://to-do-list-521ae.firebaseio.com',
  storageBucket: 'to-do-list-521ae.appspot.com'
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(config)
  }
}).$mount('#app')
