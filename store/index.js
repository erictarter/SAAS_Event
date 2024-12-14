import { auth } from '~/plugins/firebase'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    auth.onAuthStateChanged(user => {
      commit('setUser', user)
    })
  },
}