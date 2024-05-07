import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { uid } from 'uid'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const apiUrl = import.meta.env.VITE_API_URL_PUBLIC

export const usePublicStore = defineStore('public', {
  state: () => ({
    sections: reactive([]),
    user: reactive({}),
    loading: ref(true)
  }),
  getters: {
    getSections(state) {
      return state.sections
    },
    getUser(state) {
      return state.user
    },
    getLoading(state) {
      return state.loading
    }
  },
  actions: {
    setUser(data) {
      this.user = data
    },
    setSections(data) {
      this.sections.push(...data)
    },
    async getData(username) {
      try {
        const res = await axios.get(`${apiUrl}/${username}`)
        if (res.data && res.data.message === 'success') {
          this.setLoading(false)
          this.setUser(res.data.user), this.setSections(res.data.links)
        }
      } catch (e) {
        this.setLoading(false)
      }
    },
    setLoading(data) {
      this.loading = data
    }
  }
})
