import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import enUS from '../i18n/locales/en-US'
import { StorageFactory } from '@prompt-optimizer/core'

// 创建i18n实例
const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
  }
})

// 初始化语言设置
async function initializeLanguage() {
  try {
    const storage = StorageFactory.createDefault()
    const savedLanguage = await storage.getItem('preferred-language')
    
    // 使用保存的语言或默认en-US
    if (savedLanguage === 'en-US') {
      i18n.global.locale.value = 'en-US'
      return
    }

    i18n.global.locale.value = 'en-US'
    await storage.setItem('preferred-language', 'en-US')
  } catch (error) {
    console.error('Failed to initialize language settings:', error)
    i18n.global.locale.value = 'en-US'
  }
}

// 导出插件安装函数
export function installI18n(app: App) {
  initializeLanguage()
  app.use(i18n)
}

export { i18n }
