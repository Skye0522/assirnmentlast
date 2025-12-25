import { defineStore } from 'pinia'
import axios from 'axios'

export const useResultStore = defineStore('result', {
  state: () => ({
    officeId: '',
    from: '',
    to: '',
    monthlyResults: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchResult() {
      this.loading = true
      this.error = null

      try {
        const res = await axios.get(
          'https://calm-river-0d3498600.4.azurestaticapps.net/api/SELECT',
          {
            params: {
              officeId: this.officeId,
              from: this.from,
              to: this.to,
            },
          },
        )

        this.monthlyResults = res.data.data ?? []
      } catch (e) {
        console.error(e)
        this.error = '実績取得に失敗しました'
        this.monthlyResults = []
      } finally {
        this.loading = false
      }
    },
  },
})
