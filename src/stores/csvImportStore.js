import { defineStore } from 'pinia'
import axios from 'axios'

export const useCsvImportStore = defineStore('csvImport', {
  state: () => ({
    formula: {
      loading: false,
      success: null,
      error: null,
    },
    performance: {
      loading: false,
      success: null,
      error: null,
    },
  }),

  actions: {
    async importFormulaCsv(file) {
      return this.importCsv('formula', '/api/csv/formula', file)
    },

    async importPerformanceCsv(file) {
      return this.importCsv('performance', '/api/csv/performance', file)
    },

    async importCsv(type, url, file) {
      const state = this[type]

      state.loading = true
      state.success = null
      state.error = null

      try {
        const formData = new FormData()
        formData.append('file', file)

        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        state.success = 'CSVを正常に取り込みました'
      } catch (e) {
        console.error(e)
        state.error = 'CSVの取り込みに失敗しました'
      } finally {
        state.loading = false
      }
    },
  },
})
