import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: 'uid1',
      profilePic:
        'https://images.pexels.com/photos/22626143/pexels-photo-22626143/free-photo-of-a-woman-with-curly-hair-and-a-white-dress.jpeg',
      name: 'Jane Doe',
      bio: 'Software Engineer',
      username: 'janethedoe'
    }
  }),
  getters: {
    getProfile(state) {
      return state.user
    }
  }
})
