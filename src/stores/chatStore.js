import { defineStore } from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    loading: false,
  }),

  actions: {
    async send(text) {
      this.messages.push({ role: 'user', text })
      this.loading = true

      try {
        const res = await axios.post('/api/chat', {
          message: text,
        })

        this.messages.push({
          role: 'ai',
          text: res.data,
        })
      } catch {
        this.messages.push({
          role: 'ai',
          text: 'エラーが発生しました',
        })
      } finally {
        this.loading = false
      }
    },
  },
})
