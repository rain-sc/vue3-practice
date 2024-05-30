import { SizeEnum } from './enums/SizeEnum'
import { LayoutEnum } from './enums/LayoutEnum'
import { ThemeEnum } from './enums/ThemeEnum'
import type { AppSettings } from './types/global'

const defaultSettings: AppSettings = {
  title: 'vue3-practice',
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  layout: LayoutEnum.LEFT,
  theme: ThemeEnum.LIGHT,
  size: SizeEnum.DEFAULT,
  themeColor: '#409EFF',

}

export default defaultSettings
