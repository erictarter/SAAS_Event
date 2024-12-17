import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '~/plugins/firebase'

export const state = () => ({
  user: null,
  loading: true,
})

export const mutations = {
  setUser(state, user) {
    state.user = user ? { ...user } : null
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

export const getters = {
  isAuthenticated: (state) => !!state.user,
  getCurrentUser: (state) => state.user,
  isLoading: (state) => state.loading
}

export const actions = {
  async nuxtServerInit({ commit }) {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          commit('setUser', user ? { 
            uid: user.uid, 
            email: user.email, 
          } : null)
          
          commit('setLoading', false)
          unsubscribe()
          resolve(user)
        },
        (error) => {
          console.error('Auth state change error:', error)
          commit('setLoading', false)
          unsubscribe()
          reject(error)
        }
      )
    })
  },

  async signIn({ commit }, { email, password }) {
    commit('setLoading', true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      commit('setUser', {
        uid: user.uid,
        email: user.email,
      })

      commit('setLoading', false)
      
      return user
    } catch (error) {
      commit('setLoading', false)
      console.error('Error signing in:', error)
      throw error
    }
  },

  async signOut({ commit }) {
    commit('setLoading', true)

    try {
      await auth.signOut()
      commit('setUser', null)
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
      console.error('Error signing out:', error)
      throw error
    }
  }
}