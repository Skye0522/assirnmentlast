<template>
  <div class="title">分析チャットボット</div>
  <div>
    使い方：「399xxxxオフィスの20xx年xx月～xx月の挙績率を分析して」のように話しかけてみてください。
  </div>
  <v-container class="fill-height d-flex flex-column">
    <!-- メッセージ表示 -->
    <v-card class="flex-grow-1 pa-4 mb-3 overflow-y-auto chat-area">
      <div
        v-for="(m, i) in chat.messages"
        :key="i"
        :class="['chat-row', m.role === 'user' ? 'chat-right' : 'chat-left']"
      >
        <div :class="['chat-bubble', m.role === 'user' ? 'bubble-user' : 'bubble-ai']">
          {{ m.text }}
        </div>
      </div>
    </v-card>

    <!-- 入力 -->
    <v-row>
      <v-col cols="10">
        <v-text-field
          class="text"
          v-model="input"
          placeholder="質問を入力..."
          @keyup.enter="send"
        />
      </v-col>
      <v-col cols="2">
        <v-btn class="btn ml-2" color="primary" block :loading="chat.loading" @click="send">
          送信
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chatStore'

const chat = useChatStore()
const input = ref('')

const send = async () => {
  if (!input.value) return
  await chat.send(input.value)
  input.value = ''
}
</script>

<style scoped>
.title {
  font-size: 30px;
}
.chat-area {
  width: 800px;
  background: #ffffff;
}

/* 行 */
.chat-row {
  display: flex;
  margin-bottom: 12px;
}

.chat-right {
  justify-content: flex-end;
}

.chat-left {
  justify-content: flex-start;
}

/* 吹き出し本体 */
.chat-bubble {
  max-width: 70%;
  padding: 14px 18px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  border-radius: 10px;
  font-size: 14px;
}

/* ユーザー */
.bubble-user {
  background-color: #1976d2;
  color: white;
  border-top-right-radius: 4px;
}

/* AI */
.bubble-ai {
  background-color: #e0e0e0;
  color: #000;
  border-top-left-radius: 4px;
}
.text {
  width: 600px;
}
</style>
