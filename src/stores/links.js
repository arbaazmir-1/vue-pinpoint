import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { uid } from 'uid'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const apiUrl = import.meta.env.VITE_API_URL

const tokenCookie = document.cookie
  .split(';')
  .map((cookie) => cookie.trim())
  .find((cookie) => cookie.startsWith('token='))
const token = tokenCookie.split('=')[1]
const $toast = useToast()
const headers = {
  Authorization: `Bearer ${token}`
}
export const useLinksStore = defineStore('links', {
  state: () => ({
    sections: reactive([])
  }),
  getters: {
    getSections(state) {
      return state.sections
    }
  },
  actions: {
    async addNewSection(newSection) {
      const _id = uid(6)
      if (!newSection.name) {
        let instance = $toast.warning('Empty')
        return
      }
      const section = {
        name: newSection.name,
        published: newSection.publish,
        links: [],
        _id
      }
      const res = await axios.post(
        `${apiUrl}/links/create`,
        {
          name: section.name.value,
          _id: _id,
          published: section.published.value
        },
        {
          headers: headers
        }
      )
      if (res.data && res.data.message === 'section-created') {
        this.sections.push(section)
      }
    },
    async editSection(newData) {
      console.log(newData)
      const section = this.sections.find((sec) => sec._id === newData._id)
      if (section) {
        if (section.name === newData.name && section.published === newData.published) {
          return
        }
        const res = await axios.put(
          `${apiUrl}/links/edit-section`,
          {
            name: newData.name,
            _id: newData._id,
            published: newData.published
          },
          {
            headers: headers
          }
        )
        if (res.data && res.data.message === 'section-edited') {
          section.name = newData.name
          section.published = newData.published
          let instance = $toast.success('Edited')
        } else {
          let instance = $toast.error('Something went wrong')
        }
      }
    },
    async deleteSection(id) {
      console.log(id)
      const index = this.sections.findIndex((sec) => sec._id === id)
      if (index !== -1) {
        const res = await axios.delete(
          `${apiUrl}/links/delete-section/${id}`,

          {
            headers: headers
          }
        )
        if (res.data && res.data.message === 'section-deleted') {
          this.sections.splice(index, 1)
          let instance = $toast.success('Section Deleted')
        }
      }
    },
    deleteLink(linkID, sectionID) {
      const section = this.sections.find((sec) => sec._id === sectionID)
      if (section) {
        const index = section.links.findIndex((link) => link._id === linkID)
        if (index !== -1) {
          section.links.splice(index, 1)
        }
      }
    },
    updateLink(linkData, sectionID) {
      const section = this.sections.find((sec) => sec._id === sectionID)
      if (section) {
        const link = section.links.find((lnk) => lnk._id === linkData._id)
        if (link) {
          Object.assign(link, linkData)
        }
      }
    },
    addLink(sectionID, data) {
      const section = this.sections.find((sec) => sec._id === sectionID)
      if (section) {
        section.links.push(data)
      }
    },
    setSections(data) {
      this.sections.push(...data)
    },
    logoutSections() {
      this.sections.splice(0)
    },
    async fetchSections() {
      if (token) {
        const sectionData = await axios.get(`${apiUrl}/links/get-sections`, {
          headers: headers
        })
        if (sectionData.data && sectionData.data.message === 'section-found') {
          this.setSections(sectionData.data.sections)
        }
      }
    }
  }
})
