import { createStore, ActionContext } from 'vuex'
import Cookies from 'js-cookie';

import createPersistedState from 'vuex-persistedstate';




export default createStore({
  state: {
    auth: false
  },
  getters: {
  },
  mutations: {
    setAuth(state: {
      auth: boolean
    }, auth: boolean) {
      state.auth = auth
    }
  },
  actions: {
    setAuth(context: ActionContext<any, any>, auth: boolean) {
      context.commit('setAuth', auth);
    }
  },
  modules: {
  },
  strict: true,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]

})
