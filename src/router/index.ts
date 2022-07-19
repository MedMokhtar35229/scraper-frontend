import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Forgot from '@/views/Forgot.vue'
import Reset from "@/views/Reset.vue"
import AjoutModel from "@/views/models/AjoutModel.vue"
import MModel from "@/views/models/ModifierModel.vue"
import ListeFiltres from "@/views/ListeFiltres.vue"
import ModifierModel from '@/views/models/ModifierModel.vue'
import modifierNbrChampAction from '@/views/models/modifierNbrChampAction.vue'
import modifierChamp from '@/views/models/modifierChamp.vue'
import addChamp from '@/views/models/addChamp.vue'
import viewfiltresModel from '@/views/models/viewfiltresModel.vue'
import store from '@/store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: Login, meta: {
      auth: false
    }
  }, {
    path: '/modifierNbrChampAction/:id?',
    component: modifierNbrChampAction,
    name: 'modifierNbrChampAction', meta: {
      auth: true
    }
  }, {
    path: '/viewfiltresModel/:id?',
    component: viewfiltresModel,
    name: 'viewfiltresModel', meta: {
      auth: true
    }
  }, {
    path: '/ListeFiltres',
    component: ListeFiltres,
    name: 'ListeFiltres', meta: {
      auth: true
    }

  }, {
    path: '/modifierChamp/:id?',
    component: modifierChamp,
    name: 'modifierChamp', meta: {
      auth: true
    }

  }, {
    path: '/addChamp/:id?',
    component: addChamp,
    name: 'addChamp', meta: {
      auth: true
    }

  }, {
    path: '/ListModel',
    component: ModifierModel,
    name: 'ListModel', meta: {
      auth: true
    }

  }, {
    path: '/addModel',
    component: AjoutModel,
    name: 'addModel', meta: {
      auth: true
    }

  }, {
    path: '/MModel',
    component: MModel,
    name: 'mModel', meta: {
      auth: true
    }

  },
  {
    path: '/register',
    component: Register, meta: {
      auth: false
    }
  }, {
    path: '/',
    component: Home,
    name: 'Home', meta: {
      auth: true
    }
  }, {
    path: '/forgot',
    component: Forgot, meta: {
      auth: false
    }
  }, {
    path: '/reset/:token',
    component: Reset, meta: {
      auth: false
    }
  },
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if ('auth' in to.meta && to.meta.auth && !store.state.auth) {
    next('/login')
  } else if ('auth' in to.meta && !to.meta.auth && store.state.auth) {
    next('/')
  }
  else {
    next()
  }
})

export default router
