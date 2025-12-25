<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <!-- 固定ヘッダー -->
    <v-app-bar app fixed color="primary" dark>
      <v-col class="d-flex align-center" cols="auto">
        <v-app-bar-title> 業績管理表システム </v-app-bar-title>
        <v-divider vertical class="mx-3" />
        <!-- ログイン後ページ -->
        <template v-if="auth.isLoggedIn">
          <RouterLink to="/">
            <v-btn variant="text" color="white">業績管理表</v-btn>
          </RouterLink>
          <v-divider vertical class="mx-3" />
          <RouterLink to="/chat">
            <v-btn variant="text" color="white">分析BOT</v-btn>
          </RouterLink>
          <v-divider vertical class="mx-3" />
          <!-- 権限11のみ -->
          <RouterLink v-if="auth.role === 11" to="/edit">
            <v-btn variant="text" color="white">実績編集</v-btn>
          </RouterLink>
          <v-divider vertical class="mx-3" />
        </template>
      </v-col>

      <v-spacer />

      <v-divider vertical class="mx-3" />

      <!-- ログアウトボタン -->
      <v-btn variant="outlined" @click="logout"> ログアウト </v-btn>
    </v-app-bar>

    <!-- メインコンテンツ -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
