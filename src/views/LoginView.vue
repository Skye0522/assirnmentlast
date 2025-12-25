<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const employeeNo = ref('')
const password = ref('')

const login = async () => {
  await auth.login(employeeNo.value, password.value)
  router.push('/')
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 30vh">
    <v-card class="login-card pa-6">
      <v-card-title class="text-h6 text-center"> ログイン </v-card-title>

      <v-text-field label="個人番号" v-model="employeeNo" />
      <v-text-field label="パスワード" type="password" v-model="password" />
      <v-btn @click="login">ログイン</v-btn>
    </v-card>
  </v-container>
</template>
<style scoped>
.login-card {
  width: 400px;
}
</style>
