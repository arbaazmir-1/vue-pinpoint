import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerifyEmail from '@/views/VerifyEmail.vue'
import PublicLinksView from '@/views/PublicLinksView.vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { useLinksStore } from '@/stores/links'
const apiUrl = import.meta.env.VITE_API_URL
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:username',
      name: 'publicview',
      component: PublicLinksView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/auth/verify-code/:email',
      name: 'verify-code',
      component: VerifyEmail,
      meta: { checkEmail: true }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

router.beforeEach((to, from) => {
  const store = useAuthStore()
  const linkStore = useLinksStore()
  const user = store.getProfile
  if (to.meta.checkEmail) {
    if (!to.params.email) {
      router.push({ name: 'register' })
    }
    const email = to.params.email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      router.push({ name: 'register' })
    }

    const handleComplete = async () => {
      try {
        const res = await axios.post(`${apiUrl}/auth/verify`, {
          email: to.params.email
        })

        if ((res.data.message = 'email-verified')) {
          router.push({ name: 'login', replace: true })
        }
      } catch (e) {
        console.log(e)
      }
    }
    handleComplete()
  }
  if (to.name === 'login' || to.name === 'register') {
    if (!user) {
      const tokenCookie = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('token='))

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1]
        console.log(token) // This will log the token value

        const handleGetUser = async () => {
          try {
            const headers = {
              Authorization: `Bearer ${token}`
            }

            const res = await axios.get(`${apiUrl}/auth/getUser`, {
              headers: headers
            })

            if (res.data.message === 'auth-success') {
              router.push({ name: 'home', replace: true })
              store.setUser(res.data.user)
            }
          } catch (e) {
            console.log(e)
          }
        }

        handleGetUser()
      }
    }
  }
  if (to.meta.requiresAuth) {
    if (!user) {
      const tokenCookie = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('token='))

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1]

        const handleGetUser = async () => {
          try {
            const headers = {
              Authorization: `Bearer ${token}`
            }

            const res = await axios.get(`${apiUrl}/auth/getUser`, {
              headers: headers
            })

            if (res.data.message === 'auth-success') {
              store.setUser(res.data.user)
              const sectionData = await axios.get(`${apiUrl}/links/get-sections`, {
                headers: headers
              })
              if (sectionData.data && sectionData.data.message === 'section-found') {
                linkStore.setSections(sectionData.data.sections)
              }

              router.push({ name: 'home', replace: true })
            }
          } catch (e) {
            console.log(e)
          }
        }

        handleGetUser()
      } else {
        router.push({ name: 'login', replace: true })
      }
    }
  }
})

export default router
