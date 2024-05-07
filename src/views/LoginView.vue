<script setup>
import login from '../assets/login.svg?url'
import catLottie from '../assets/catLottieB.json'
import curveLine from '../assets/curveLine.svg?url'
import { LottieAnimation } from 'lottie-web-vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RouterLink } from 'vue-router'
import ModeToggle from '@/components/ModeToggle.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import { useLinksStore } from '@/stores/links'
const $toast = useToast()
let anim = ref()
const email = ref('')
const password = ref('')
const store = useAuthStore()
const linkStore = useLinksStore()
const loading = ref(false)
const router = useRouter()
const formData = computed(() => ({
  email: email.value,
  password: password.value
}))
const loginFunc = async () => {
  const { email, password } = formData.value
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    let instance = $toast.warning('Invalid Email')
    return
  }
  if (password.length < 8) {
    let instance = $toast.warning('Too Short Password')
    return
  }
  loading.value = true
  const res = await store.login({ email, password })
  loading.value = false
  if (res.data && res.data.message === 'auth-success') {
    await linkStore.fetchSections(res.data.token)
    router.push({ name: 'home', replace: true })
  }
  if (res.response && res.response.status === 400) {
    if (res.response.data.message === 'not-verified') {
      router.push({ name: 'verify-code', params: { email: email } })
    }
  }
}
</script>

<template lang="pug">
div(class="animate-fade-in w-screen h-screen flex md:flex-row flex-col-reverse justify-between")
    div(class="w-1/2 h-full hidden md:flex items-center justify-center p-10")
        div(class="flex flex-col items-center justify-center w-11/12 mx-auto rounded-md h-full bg-gradient-to-br to-100%  from-[#e99898] via-[#dc45ff80] dark:to-black to-white")
            h2(class="w-6/12 text-3xl text-start mx-auto text-white my-5") Store All Your Links 
                br
                | In One Place
            img(:src="login" class="w-6/12")
            p(class="w-6/12 text-start mx-auto text-white my-5") Store With Ease
                br 
                | Share With Ease
                br
                | Get Analytics Of Each Clicks
            

    div(class="md:w-1/2 h-full form-container flex items-center justify-center")
        div(class="w-11/12 md:w-3/4 lg:w-1/2 h-fit md:h-1/2 mx-auto  flex flex-col items-center p-5")
            h2(class="text-5xl abeezee-regular flex ") 📌 
                span(class="homemade-apple-regular") P
                |inpoint
                
           
            p(class="text-center") Seamless Sharing of Your Crafted 
                br 
                |Links Across Platforms!
            div(class="form w-full flex-col flex h-fit my-5 p-10  space-y-5 dark:bg-gray-800 bg-[#f9f9f9] shadow-lg rounded-md")
                div 
                    h5 Login
                div
                    Label Enter Your Email
                    Input(placeholder="Enter Email" v-model="email" type="email")
                div
                    Label Enter Your Password
                    Input(placeholder="Enter Password" type="password" v-model="password")
                //- lottie-animation(:animation-data="catLottie" :auto-play="true" :speed="1" ref="anim" class="h-10")
                Button(@click='loginFunc' :disabled='password.length<8 || loading') 
                    div(class="h-5 w-5 animate-spin rounded-full  border-b-2 border-t-2 border-white "  v-if='loading'  )
                    span(v-if='!loading') Login
                div( class="w-full flex flex-col items-end text-xs") 
                    p Don't have an account?
                    router-link(to="/auth/register" class="hover:text-blue-400 transition-colors duration-150 ease-in-out") Create Account
    div(class="bottom-10 absolute right-10 z-10")
        mode-toggle
                    



                
    
   
                           
</template>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Homemade+Apple&display=swap')
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Homemade+Apple&display=swap')
.form-container
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3cpath d='M376.6 591.61C568.46 554 652.53 68 954.09 64.24 1255.64 60.48 1380.42 241.4 1531.57 243.44' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M473.67 596.6C564.49 595.74 548.58 504.62 824.08 500.74 1099.58 496.86 1340.12 268.65 1524.9 265.54' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M138.23 641.16C321.44 636.15 454.18 377.42 818.73 368.44 1183.28 359.46 1317.86 120.44 1499.23 116.44' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M682.51 639.17C818.74 635.2 911.14 442.13 1186.87 432.22 1462.6 422.31 1551.64 197.49 1691.23 191.42' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M217.2 624.91C385.36 578.82 428.67 122.29 689.18 111.42 949.69 100.55 925.17 181.42 1161.16 181.42 1397.15 181.42 1513.85 111.61 1633.14 111.42' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")
    background-repeat: no-repeat
    background-size: contain
    background-position: bottom
.homemade-apple-regular
    font-family: "Homemade Apple", cursive
    font-weight: 400
    font-style: normal
.abeezee-regular
    font-family: "ABeeZee", sans-serif
    font-weight: 400
    font-style: normal
</style>
