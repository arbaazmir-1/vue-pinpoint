import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePublicStore = defineStore('public', {
  state: () => ({
    sections: reactive([
      {
        _id: 'sectionUid1',
        name: 'Socials',
        published: true,
        links: [
          { _id: 'linkUid1', name: 'Facebook', link: 'https://facebook.com', clicks: 212 },
          { _id: 'linkUid2', name: 'Twitter', link: 'https://twitter.com', clicks: 150 },
          { _id: 'linkUid3', name: 'Instagram', link: 'https://instagram.com', clicks: 180 },
          { _id: 'linkUid4', name: 'LinkedIn', link: 'https://linkedin.com', clicks: 120 },
          { _id: 'linkUid5', name: 'Pinterest', link: 'https://pinterest.com', clicks: 90 },
          { _id: 'linkUid6', name: 'Snapchat', link: 'https://snapchat.com', clicks: 80 }
        ]
      },
      {
        _id: 'sectionUid2',
        name: 'News',
        published: false,
        links: [
          { _id: 'linkUid7', name: 'CNN', link: 'https://cnn.com', clicks: 300 },
          { _id: 'linkUid8', name: 'BBC', link: 'https://bbc.com', clicks: 250 },
          { _id: 'linkUid9', name: 'The Guardian', link: 'https://theguardian.com', clicks: 200 },
          { _id: 'linkUid10', name: 'New York Times', link: 'https://nytimes.com', clicks: 180 }
        ]
      },
      {
        _id: 'sectionUid3',
        name: 'Shopping',
        published: true,
        links: [
          { _id: 'linkUid11', name: 'Amazon', link: 'https://amazon.com', clicks: 500 },
          { _id: 'linkUid12', name: 'eBay', link: 'https://ebay.com', clicks: 400 },
          { _id: 'linkUid13', name: 'Walmart', link: 'https://walmart.com', clicks: 300 },
          { _id: 'linkUid14', name: 'Target', link: 'https://target.com', clicks: 250 }
        ]
      },
      {
        _id: 'sectionUid4',
        name: 'Technology',
        published: true,
        links: [
          { _id: 'linkUid15', name: 'TechCrunch', link: 'https://techcrunch.com', clicks: 400 },
          { _id: 'linkUid16', name: 'The Verge', link: 'https://theverge.com', clicks: 350 },
          { _id: 'linkUid17', name: 'Wired', link: 'https://wired.com', clicks: 300 },
          { _id: 'linkUid18', name: 'Ars Technica', link: 'https://arstechnica.com', clicks: 280 }
        ]
      }
    ]),
    user: {
      name: 'Alex',
      profilePic: 'https://github.com/radix-vue.png',
      bio: 'Software Engineer'
    }
  }),
  getters: {
    getSections(state) {
      return state.sections
    },
    getUser(state) {
      return state.user
    }
  }
})
