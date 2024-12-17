import { auth } from '~/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const state = () => ({
  user: null,
  loading: true,
})

export const mutations = {
  setUser(state, user) {
    // Create a new object to avoid direct mutation
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
  async nuxtServerInit({ commit }, { req }) {
    return new Promise((resolve, reject) => {
      // Use onAuthStateChanged to handle authentication state
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          // Safely commit the user, creating a new object
          commit('setUser', user ? { 
            uid: user.uid, 
            email: user.email, 
            // Add any other properties you need
          } : null)
          
          commit('setLoading', false)
          
          // Important: unsubscribe to prevent memory leaks
          unsubscribe()
          
          resolve(user)
        },
        (error) => {
          console.error('Auth state change error:', error)
          commit('setLoading', false)
          
          // Important: unsubscribe to prevent memory leaks
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

      // Commit a new object with specific properties
      commit('setUser', {
        uid: user.uid,
        email: user.email,
        // Add any other properties you need
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
      
      // Set user to null
      commit('setUser', null)
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
      console.error('Error signing out:', error)
      throw error
    }
  }
}