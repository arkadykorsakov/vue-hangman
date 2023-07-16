<script setup lang="ts">
import { ref, type Ref } from 'vue'

const isVisible: Ref<boolean> = ref(false)

const open = (): void => {
  isVisible.value = true
}

const close = (): void => {
  isVisible.value = false
}

defineExpose({ open, close })
</script>

<template>
  <div :class="['notification-container', { show: isVisible }]">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<style scoped></style>
