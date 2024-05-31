import defaultSettings from '@/settings'
import store from '@/store'
import { SidebarStatusEnum } from '@/enums/SidebarStatusEnum'

export const useAppStore = defineStore('app', () => {
  const sidebarStatus = useStorage('sidebarStatus', SidebarStatusEnum.CLOSED)
  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatusEnum.OPENED,
    withoutAnimation: false,
  })

  function toggleSidebar() {
    sidebar.opened = !sidebar.opened
    sidebarStatus.value = sidebar.opened
      ? SidebarStatusEnum.OPENED
      : SidebarStatusEnum.CLOSED
  }

  function closeSideBar() {
    sidebar.opened = false
    sidebarStatus.value = SidebarStatusEnum.CLOSED
  }

  function openSideBar() {
    sidebar.opened = true
    sidebarStatus.value = SidebarStatusEnum.OPENED
  }

  return {
    sidebar,
    toggleSidebar,
    closeSideBar,
    openSideBar,
  }
})

export function useAppStoreHook() {
  return useAppStore(store)
}
