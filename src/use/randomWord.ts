import { getRandomName } from '@/api/getRandomName'
import { onMounted, ref, type Ref } from 'vue'

interface ReturnUseRandomWord {
  word: Ref<string>
  getRandomWord: () => void
}

export const useRandomWord = (): ReturnUseRandomWord => {
  const word: Ref<string> = ref('')

  const getRandomWord = async () => {
    try {
      const name = await getRandomName()
      word.value = name.toLocaleLowerCase()
    } catch (e) {
      word.value = ''
    }
  }

  onMounted(() => {
    getRandomWord()
  })

  return { word, getRandomWord }
}
