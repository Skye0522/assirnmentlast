import { defineStore } from 'pinia'
import axios from 'axios'

export const useCalculateStore = defineStore('calculate', {
  state: () => ({
    yearMonth: '',
    success: null,
    error: null,
  }),
  actions: {
    async calculatePerf() {
      try {
        this.success = null
        this.error = null

        await axios.get('https://calm-river-0d3498600.4.azurestaticapps.net/api/calculate')

        this.success = '計算処理が完了しました'
      } catch (error) {
        console.error(error)
        this.error = '計算実行に失敗しました'
      }
    },
  },
})
