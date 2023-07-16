import { computed, ref, type Ref } from 'vue'

interface ReturnUseLetters {
  letters: Ref<string[]>
  correctLetters: Ref<string[]>
  wrongLetters: Ref<string[]>
  isLose: Ref<boolean>
  isWin: Ref<Boolean>
  addLetter: (key: string) => void
  resetLetters: () => void
}

export const useLetters = (word: Ref<string>): ReturnUseLetters => {
  const letters: Ref<string[]> = ref([])

  const correctLetters = computed<string[]>(() =>
    letters.value.filter((letter) => word.value.includes(letter))
  )

  const wrongLetters = computed<string[]>(() =>
    letters.value.filter((letter) => !word.value.includes(letter))
  )

  const isLose = computed<boolean>(() => wrongLetters.value.length === 6)
  const isWin = computed<boolean>(() =>
    Array.from(word.value).every((letter) => correctLetters.value.includes(letter))
  )

  const addLetter = (key: string): void => {
    if (/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key.toLocaleLowerCase())
    }
  }

  const resetLetters = (): void => {
    letters.value = []
  }

  return { letters, correctLetters, wrongLetters, isLose, isWin, addLetter, resetLetters }
}
