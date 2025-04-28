import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: {
      id: '',
      account: '',
      token: '',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser: (state, user) => {
      state.user.id = user.id
      state.user.account = user.account
      state.user.token = user.token
      state.user.avatar = user.avatar
    }
  },
  plugins: [createPersistedState()]
})

