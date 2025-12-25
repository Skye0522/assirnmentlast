<script setup>
import { useResultStore } from '@/stores/resultStore'
import { useAuthStore } from '@/stores/authStore'

const store = useResultStore()
const auth = useAuthStore()

store.officeId = auth.officeId

const headers = [
  { title: '項目', key: 'name' },
  { title: '値', key: 'value' },
]
</script>

<template>
  <v-app>
    <v-card class="card mt-6">
      <v-card-title>実績表示</v-card-title>

      <v-card-text>
        <v-text-field v-model="store.officeId" label="オフィスID" />
        <v-text-field v-model="store.from" label="開始年月 (YYYYMM)" />
        <v-text-field v-model="store.to" label="終了年月 (YYYYMM)" />

        <v-btn color="primary" :loading="store.loading" @click="store.fetchResult"> 表示 </v-btn>

        <v-alert v-if="store.error" type="error" class="mt-2">
          {{ store.error }}
        </v-alert>

        <!-- ★ 月ごとにカードを横並び -->
        <div class="monthly-cards mt-6">
          <div v-for="month in store.monthlyResults" :key="month.year_month" class="month-card">
            <v-card class="pa-3">
              <h3>{{ month.year_month }}</h3>
              <v-data-table :headers="headers" :items="month.results" density="compact" />
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<style scoped>
.card {
  width: 800px;
}
.monthly-cards {
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.month-card {
  min-width: 300px;
}
</style>
