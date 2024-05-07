import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const apiUrl = import.meta.env.VITE_API_URL
let tokenCookie = document.cookie
let token
if (tokenCookie) {
  tokenCookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('token='))
  token = tokenCookie.split('=')[1]
}
const $toast = useToast()
const headers = {
  Authorization: `Bearer ${token}`
}
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
    },
    setUser(data) {
      this.user = data
    },
    async login(data) {
      const $toast = useToast()

      try {
        const res = await axios.post(`${apiUrl}/auth/login`, data)

        if (res.data.message === 'auth-success') {
          let instance = $toast.success('Login Success')
          $cookies.set('token', res.data.token)
          this.setUser(res.data.user)
          return res
        }
      } catch (e) {
        if (e.response.data.message === 'no-user') {
          let instance = $toast.error('No Such User')
        }
        if (e.response.data.message === 'not-verified') {
          let instance = $toast.error('Please Verify Email')
        }
        if (e.response.data.message === 'incorrect-password') {
          let instance = $toast.error('Incorrect Password')
        }
        return e
      }
    },
    async updateUser(data) {
      if (token) {
        try {
          const res = await axios.put(`${apiUrl}/auth/updateUser`, data, {
            headers: headers
          })

          if (res.data && res.data.message === 'user-updated') {
            let instance = $toast.success('User update')

            this.user = res.data.user

            return res
          }
        } catch (e) {
          console.log(e)
          if (e.response.data.message === 'user-not-found') {
            let instance = $toast.error('Sorry You do not exist')
          }
          if (e.response.data.message === 'username-taken') {
            let instance = $toast.error('That username is not available!')
          }
          return e
        }
      }
    }
  }
})
