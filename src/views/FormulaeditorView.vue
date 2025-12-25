<script setup>
import { ref } from 'vue'
import { useCsvImportStore } from '@/stores/csvImportStore'
import { useCalculateStore } from '@/stores/calculateStore'

const store = useCsvImportStore()
const store2 = useCalculateStore()

const formulaFile = ref(null)
const performanceFile = ref(null)

const submitFormula = () => {
  if (!formulaFile.value) return
  store.importFormulaCsv(formulaFile.value)
}

const submitPerformance = () => {
  if (!performanceFile.value) return
  store.importPerformanceCsv(performanceFile.value)
}
</script>
<template>
  <v-app>
    <v-container class="d-flex flex-column ga-6">
      <!-- 計算式CSV -->
      <div class="editcard">
        <v-card>
          <v-card-title>計算式一覧CSV取り込み</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="formulaFile"
              label="CSVファイル"
              accept=".csv"
              :disabled="store.formula.loading"
            />

            <v-btn
              class="mt-2"
              color="primary"
              :loading="store.formula.loading"
              :disabled="!formulaFile"
              @click="submitFormula"
            >
              送信
            </v-btn>

            <v-alert v-if="store.formula.success" type="success" class="mt-2">
              {{ store.formula.success }}
            </v-alert>

            <v-alert v-if="store.formula.error" type="error" class="mt-2">
              {{ store.formula.error }}
            </v-alert>
          </v-card-text>
        </v-card>

        <!-- 業績CSV -->
        <v-card>
          <v-card-title>業績データCSV取り込み</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="performanceFile"
              label="CSVファイル"
              accept=".csv"
              :disabled="store.performance.loading"
            />

            <v-btn
              class="mt-2"
              color="primary"
              :loading="store.performance.loading"
              :disabled="!performanceFile"
              @click="submitPerformance"
            >
              送信
            </v-btn>

            <v-alert v-if="store.performance.success" type="success" class="mt-2">
              {{ store.performance.success }}
            </v-alert>

            <v-alert v-if="store.performance.error" type="error" class="mt-2">
              {{ store.performance.error }}
            </v-alert>
          </v-card-text>
        </v-card>

        <!-- 全オフィス一括計算 -->
        <v-card>
          <v-card-title>全オフィス一括計算</v-card-title>

          <v-card-text>
            <v-btn color="primary" @click="store2.calculatePerf"> 一括計算実行 </v-btn>

            <v-alert v-if="store2.success" type="success" class="mt-2">
              {{ store2.success }}
            </v-alert>

            <v-alert v-if="store2.error" type="error" class="mt-2">
              {{ store2.error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>
.editcard {
  width: 800px;
}
</style>
