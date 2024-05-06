<template lang="pug">
div(class="w-full mx-auto overflow-y-scroll   flex flex-col h-full animate-fade-in " )
    div(v-for="(section,sectionName) in store.getSections" class="w-full p-4 flex flex-col space-y-4" :key="section._id") 
        div(class="w-full flex items-center justify-between") 
            h2(@click="toggleDialog(section)" class="text-2xl flex items-center" ) {{section.name}} 
                <svg  class="mx-2" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                Badge(:class="[section.published  ? 'bg-green-400' : 'bg-red-400']") {{section.published ? "Published" : "Not Published"}}
            trash-icon(class="w-5 h-7" @click="toggleDelete(section)")
        
        div(v-for="link in section.links" class="w-full transition-colors duration-150 flex items-center justify-between ease-linear cursor-pointer select-none dark:bg-gray-800 bg-gray-200 hover:bg-blue-50 p-2 rounded-sm" :key="link.name")
            p {{link.name}}
            p(class="text-xs") URL: {{link.link}}
            Button(variant='outline' @click="editLinkToggle(link,section._id)") <svg   width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Button(@click='toggleAddLinks(section._id)' class="dark:bg-blue-400") Add Link
    div(class="w-full p-4 flex flex-col space-y-4 items-end")
        <svg @click="openAddDialog = !openAddDialog" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    div(v-if='Object.keys(store.getSections).length ===0' class="w-full flex items-center justify-center")
        p(class="text-sm text-blue-400") Add Some Link! Click that nice add button to get started!


edit-section-dialog-comp( v-if="showDialog"  :changeDialog="toggleDialog" :data="selected")
add-section-comp(@closeDialog="openAddDialog = !openAddDialog" v-if='openAddDialog' )
delete-dialog(v-if='showDeleteDialog' @closeDialog='showDeleteDialog = !showDeleteDialog' :data="selected")
edit-link-dialog(v-if='showEditLinkDialog' , @closeDialog='showEditLinkDialog = !showEditLinkDialog' :data='selected' :sectionID='sectionID')
add-links-dialog(v-if='showAddLinkDialog' @closeDialog='showAddLinkDialog = !showAddLinkDialog' :sectionID='sectionID') 
    
</template>
<script setup>
import { ref, reactive } from 'vue'
import EditSectionDialogComp from '@/components/EditSectionDialogComp.vue'
import AddSectionComp from '@/components/AddSectionComp.vue'
import { Badge } from '@/components/ui/badge'
import { TrashIcon } from 'lucide-vue-next'
import DeleteDialog from './DeleteDialog.vue'
import { useLinksStore } from '@/stores/links'
import { Button } from './ui/button'
import EditLinkDialog from './EditLinkDialog.vue'
import AddLinksDialog from './AddLinksDialog.vue'
const store = useLinksStore()

const openAddDialog = ref(false)
const selected = ref(null)
const showDialog = ref(false)
const showDeleteDialog = ref(false)
const showEditLinkDialog = ref(false)
const showAddLinkDialog = ref(false)
const sectionID = ref(null)

const toggleDelete = (section) => {
  selected.value = section
  showDeleteDialog.value = !showDeleteDialog.value
}
const toggleAddLinks = (id) => {
  console.log(id)
  sectionID.value = id
  showAddLinkDialog.value = !showAddLinkDialog.value
}
const toggleDialog = (section) => {
  selected.value = section
  showDialog.value = !showDialog.value
}
const editLinkToggle = (link, id) => {
  sectionID.value = id
  selected.value = link
  showEditLinkDialog.value = !showEditLinkDialog.value
}
</script>

<style lang="sass" scoped></style>
