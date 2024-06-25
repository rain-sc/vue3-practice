import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/store'

export const permission: Directive = {

  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUserStore()
    const points = userStore.userProfile.roles.points || []
    if (!points.includes(binding.value))
      el.parentNode && el.parentNode.removeChild(el)
  },
}
