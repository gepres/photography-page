import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    azul:'#503F8C',
    colorFooter:'#2C3E50',
    colorNav:'#04BF68'
  },
  options: {
    customProperties: true
  },
  iconfont: ['fa','md']
})
