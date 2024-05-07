<template lang="pug">
div(class="animate-fade-in h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0")
    navbar-comp
    div(class="w-full flex  h-fit mx-auto items-center space-x-4")
        div(class="tab-link flex flex-col space-y-2 cursor-pointer select-none" @click="changeTabs(link)" :class="[currentTab === link && 'active-link']"  v-for="(link,index) in tabs") {{link}}
            hr
    link-container-comp(v-if="currentTab==='Home'" )
    profile-container-comp(v-if="currentTab==='Profile'")
    
        

 
</template>

<script setup>
import NavbarComp from '@/components/NavbarComp.vue'
import LinkContainerComp from '@/components/LinkContainerComp.vue'
import ProfileContainerComp from '@/components/ProfileContainerComp.vue'
import { ref } from 'vue'
let tabs = ['Home', 'Profile']
let currentTab = ref(tabs[0])

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
