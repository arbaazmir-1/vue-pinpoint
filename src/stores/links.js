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
          { id: 'linkuid1', name: 'Facebook', link: 'https://facebook.com', clicks: 212 },
          { id: 'linkuid2', name: 'Twitter', link: 'https://twitter.com', clicks: 150 },
          { id: 'linkuid3', name: 'Instagram', link: 'https://instagram.com', clicks: 180 },
          { id: 'linkuid4', name: 'LinkedIn', link: 'https://linkedin.com', clicks: 120 },
          { id: 'linkuid5', name: 'Pinterest', link: 'https://pinterest.com', clicks: 90 },
          { id: 'linkuid6', name: 'Snapchat', link: 'https://snapchat.com', clicks: 80 }
        ]
      },
      uid2: {
        id: 'uid2',
        createdAt: new Date(),
        name: 'News',
        published: false,
        links: [
          { id: 'linkuid7', name: 'CNN', link: 'https://cnn.com', clicks: 300 },
          { id: 'linkuid8', name: 'BBC', link: 'https://bbc.com', clicks: 250 },
          { id: 'linkuid9', name: 'The Guardian', link: 'https://theguardian.com', clicks: 200 },
          { id: 'linkuid10', name: 'New York Times', link: 'https://nytimes.com', clicks: 180 }
        ]
      },
      uid3: {
        id: 'uid3',
        createdAt: new Date(),
        name: 'Shopping',
        published: true,
        links: [
          { id: 'linkuid11', name: 'Amazon', link: 'https://amazon.com', clicks: 500 },
          { id: 'linkuid12', name: 'eBay', link: 'https://ebay.com', clicks: 400 },
          { id: 'linkuid13', name: 'Walmart', link: 'https://walmart.com', clicks: 300 },
          { id: 'linkuid14', name: 'Target', link: 'https://target.com', clicks: 250 }
        ]
      },
      uid4: {
        id: 'uid4',
        createdAt: new Date(),
        name: 'Technology',
        published: true,
        links: [
          { id: 'linkuid15', name: 'TechCrunch', link: 'https://techcrunch.com', clicks: 400 },
          { id: 'linkuid16', name: 'The Verge', link: 'https://theverge.com', clicks: 350 },
          { id: 'linkuid17', name: 'Wired', link: 'https://wired.com', clicks: 300 },
          { id: 'linkuid18', name: 'Ars Technica', link: 'https://arstechnica.com', clicks: 280 }
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
        published: newSection.publish.value,
        links: []
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
    },
    deleteLink(linkID, sectionID) {
      const section = this.links[sectionID]
      if (section) {
        let index = section.links.findIndex((item) => item.id === linkID)
        if (index !== -1) {
          section.links.splice(index, 1)
        }
      }
    },
    updateLink(linkData, sectionID) {
      const section = this.links[sectionID]
      if (section) {
        let index = section.links.findIndex((item) => item.id === linkData.id)
        if (index !== -1) {
          section.links[index] = linkData
        }
      }
    },
    addLink(sectionID, data) {
      const section = this.links[sectionID]
      if (section) {
        section.links.push(data)
      }
    }
  }
})
