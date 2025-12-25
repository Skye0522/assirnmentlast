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
        const res = await axios.post(
          'https://calm-river-0d3498600.4.azurestaticapps.net/api/chat',
          {
            message: text,
          },
        )

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
