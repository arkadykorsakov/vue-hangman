<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Status } from '@/types'

interface Props {
  word: string
}

defineProps<Props>()

const isVisible: Ref<boolean> = ref(false)
const gameStatus: Ref<Status | null> = ref(null)

const open = (status: Status): void => {
  gameStatus.value = status
  isVisible.value = true
}

const close = (): void => {
  isVisible.value = false
}

defineExpose({ open, close })

const emit = defineEmits<{ (e: 'restart'): void }>()
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: {{ word }}</h3>
      </template>
      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>

<style scoped></style>
