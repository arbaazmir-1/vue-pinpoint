import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLinksStore = defineStore('links', {
  state: () => ({
    links: reactive({
      uid1: {
        id: 'uid1',
        createdAt: new Date(),
        name: 'Socials',
        published: true,
        links: [
          {
            name: 'Facebook',
            link: 'https://facebook.com',
            clicks: 212
          },
          {
            name: 'Twitter',
            link: 'https://twitter.com',
            clicks: 150
          },
          {
            name: 'Instagram',
            link: 'https://instagram.com',
            clicks: 180
          }
        ]
      },
      uid2: {
        id: 'uid2',
        createdAt: new Date(),
        name: 'News',
        published: false,
        links: [
          {
            name: 'CNN',
            link: 'https://cnn.com',
            clicks: 300
          },
          {
            name: 'BBC',
            link: 'https://bbc.com',
            clicks: 250
          }
        ]
      }
    })
  }),
  getters: {
    getLinks(state) {
      return state.links
    }
  },
  actions: {
    addNewSection(newSection) {
      const id = 'uid' + Math.floor(Math.random() * 1000)
      this.links[id] = {
        id: id,
        name: newSection.name.value,
        createdAt: new Date(),
        published: newSection.publish.value
      }
    },
    editSection(newData) {
      const section = this.links[newData.id]
      if (section) {
        section.name = newData.name
        section.published = newData.published
      }
    },
    deleteSection(id) {
      delete this.links[id]
    }
  }
})
