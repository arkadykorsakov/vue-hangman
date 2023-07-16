import type GameNotifications from '@/components/GameNotifications.vue'
import { ref, type Ref } from 'vue'

interface ReturnUseNotifications {
  notification: Ref<InstanceType<typeof GameNotifications> | null>
  showNotifications: () => void
}

export const useNotifications = (): ReturnUseNotifications => {
  const notification: Ref<InstanceType<typeof GameNotifications> | null> = ref(null)
  const showNotifications = (): void => {
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)
  }
  return { notification, showNotifications }
}
