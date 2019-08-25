import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyB589GkDB15-r8qKNJ_n7vUOL2xyPQtYYo",
  authDomain: "fotografia-page-gepres.firebaseapp.com",
  databaseURL: "https://fotografia-page-gepres.firebaseio.com",
  projectId: "fotografia-page-gepres",
  storageBucket: "fotografia-page-gepres.appspot.com",
  messagingSenderId: "537605893515",
  appId: "1:537605893515:web:8dadbe6333d322b6"
};

firebase.initializeApp(config)
export const db = firebase.firestore()


firebase.auth().onAuthStateChanged((user) => {
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
})