import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null
  },
  getters: {
    getItems: state => {
      return state.items
    }
  },
  mutations: {
    setItems: state => {
      let items = []

      db.collection('gallery').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          items.push({ id: doc.id, name: data.name, nameComplete: data.nameComplete, imageStorage: data.imageStorage, date: data.date, description: data.description, link:data.link,categoryValue:data.categoryValue })
        })

        state.items = items
      })
    }
  },
  actions: {
    setItems: context => {
      context.commit('setItems')
    }
  }
})
