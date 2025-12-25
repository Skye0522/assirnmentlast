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
      const res = await axios.post(
        'https://m3h-nochiyama-containerlast.purplefield-f71af35b.japaneast.azurecontainerapps.io/api/login',
        {
          employeeNo,
          password,
        },
      )

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
