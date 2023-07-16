<script setup lang="ts">
import { useLetters } from '@/use/letters'
import { useRandomWord } from '@/use/randomWord'
import { ref, watch, type Ref } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameNotifications from './components/GameNotifications.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import { useNotifications } from './use/notifications'

const { word, getRandomWord } = useRandomWord()
const { letters, wrongLetters, correctLetters, isLose, isWin, addLetter, resetLetters } =
  useLetters(word)
const { notification, showNotifications } = useNotifications()

const popup: Ref<InstanceType<typeof GamePopup> | null> = ref(null)

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }: KeyboardEvent): void => {
  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotifications()
    return
  }

  addLetter(key)
})

const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.close()
}
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :wrong-letters-count="wrongLetters.length" />
    <GameWrongLetters :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>

  <!-- Container for final message -->
  <GamePopup ref="popup" :word="word" @restart="restart" />

  <!-- Notification -->
  <GameNotifications ref="notification" />
</template>

<style scoped></style>
