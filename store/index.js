import { auth } from '~/plugins/firebase'

export const state = () => ({
  user: null,
  loading: true,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        commit('setUser', user)
        commit('setLoading', false)
        resolve()
      }, reject)
    })
  },
  async signIn({ commit }, { email, password }) {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      commit('setUser', user)
    } catch (error) {
      throw error
    }
  },
  async signOut({ commit }) {
    try {
      await auth.signOut()
      commit('setUser', null)
    } catch (error) {
      throw error
    }
  },
  setLoading({ commit }, loading) {
    commit('setLoading', loading)
  },
}