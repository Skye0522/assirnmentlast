import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    employeeNo: null,
    officeId: null,
    role: null,
  }),

  actions: {
    async login(employeeNo, password) {
      const res = await axios.post('/api/login', {
        employeeNo,
        password,
      })

      this.isLoggedIn = true
      this.employeeNo = res.data.employee_no
      this.officeId = res.data.office_id
      this.role = res.data.role
    },

    logout() {
      this.isLoggedIn = false
      this.employeeNo = null
      this.officeId = null
      this.role = null
    },
  },
})
