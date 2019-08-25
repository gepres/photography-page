import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import(/* webpackChunkName: "about" */ './views/Galery.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "about" */ './views/Contact.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/Admin.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/admin-tabla',
      name: 'admin-tabla',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/Admin-tabla.vue'),
      meta: {
        autentificado: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  // console.log(usuario);

  let autorizacion = to.matched.some(record => record.meta.autentificado);
  // console.log(autorizacion);

  if (autorizacion && !usuario) {
    // console.log('no puede ingresar a tabla y admin')
    next('/')
  } else if (!autorizacion && usuario) {
    next()
  } else {
    next();
  }
})


export default router;