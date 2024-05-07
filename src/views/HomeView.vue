<template lang="pug">
div(class="animate-fade-in h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0" :class="[loading ? 'items-center mt-10': '']")
    navbar-comp
    div(class="w-full flex  h-fit mx-auto items-center space-x-4")
        div(class="tab-link flex flex-col space-y-2 cursor-pointer select-none" @click="changeTabs(link)" :class="[currentTab === link && 'active-link']"  v-for="(link,index) in tabs") {{link}}
            hr
    link-container-comp(v-if="currentTab==='Home' && !loading " )
    profile-container-comp(v-if="currentTab==='Profile' && !loading ")
    div(class="h-5 w-5 animate-spin rounded-full  border-b-2 border-t-2 border-teal-400 "  v-if='loading'  )
    div(class="bottom-10 absolute left-10 z-10")
        Button(class="rounded-full" @click='copyurl') Share Url

    
    
        

 
</template>

<script setup>
import NavbarComp from '@/components/NavbarComp.vue'
import LinkContainerComp from '@/components/LinkContainerComp.vue'
import ProfileContainerComp from '@/components/ProfileContainerComp.vue'
import Button from '@/components/ui/button/Button.vue'
import { ref, computed } from 'vue'
import { useLinksStore } from '@/stores/links'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()
let tabs = ['Home', 'Profile']
let currentTab = ref(tabs[0])
const linkStore = useLinksStore()
const loading = computed(() => linkStore.getLoading)
const store = useAuthStore()
const user = computed(() => store.getProfile)
const copyurl = () => {
  const url = 'https://pinpoint.abdullahibnshahin.com/shared/' + user.value.username
  navigator.clipboard
    .writeText(url)
    .then(() => {
      let instance = $toast.success('Link Copied')
    })
    .catch((e) => {
      let instance = $toast.error('Something Went Wrong')
    })
}
const changeTabs = (link) => {
  currentTab.value = link
}
</script>

<style lang="sass" scoped>
.tab-link
    padding:2%
    border-radius: 10%1
    hr
        border-top: 1px solid transparent
        border-radius: 2%
.active-link
    color :#90e391

    hr
        border-top: 1px solid #90e391
        animation: hr-animation 1s normal

@keyframes hr-animation
    0%
        opacity: 0
    50%
        opacity: .5
    100%
        opacity: 1
</style>
