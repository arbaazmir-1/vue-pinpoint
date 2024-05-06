import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    getProfile(state) {
      return state.user
    }
  },
  actions: {
    async registerUser(data) {
      const $toast = useToast()

      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await axios.post(`${apiUrl}/auth/register`, data)
        console.log(res)
        if ((res.data.message = 'code-Sent')) {
          let instance = $toast.success('Code Sent')
          const emailFromData = res.data.email

          return res
        }
      } catch (e) {
        console.log(e)
        if (e.response.data.message === 'email-exist') {
          let instance = $toast.error('User With this email already exists')
        }
        if (e.response.data.message === 'username-taken') {
          let instance = $toast.error('That username is not available!')
        }
        return e
      }
    }
  }
})
