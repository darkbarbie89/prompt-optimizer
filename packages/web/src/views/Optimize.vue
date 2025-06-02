<template>
  <!-- ===== Prompt-Optimizer tool page ===== -->
  <MainLayoutUI>
    <template #title>
      <router-link to="/" class="flex items-center hover:opacity-80 transition-opacity">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      </router-link>
    </template>

    <template #actions>
      <ActionButtonUI icon="🚀" text="Upgrade to Pro" @click="upgradeToPro" />
      <ThemeToggleUI />
      <ActionButtonUI icon="📝" :text="$t('nav.templates')" @click="openTemplateManager('optimize')" />
      <ActionButtonUI icon="📜" :text="$t('nav.history')" @click="showHistory = true" />
      <ActionButtonUI icon="⚙️" :text="$t('nav.modelManager')" @click="showConfig = true" />
      <ActionButtonUI icon="💾" :text="$t('nav.dataManager')" @click="showDataManager = true" />
    </template>

    <ContentCardUI>
      <div class="flex-none">
        <InputPanelUI
          v-model="prompt"
          v-model:selectedModel="selectedOptimizeModel"
          :label="$t('promptOptimizer.originalPrompt')"
          :placeholder="$t('promptOptimizer.inputPlaceholder')"
          :model-label="$t('promptOptimizer.optimizeModel')"
          :template-label="$t('promptOptimizer.templateLabel')"
          :button-text="$t('promptOptimizer.optimize')"
          :loading-text="$t('common.loading')"
          :loading="isOptimizing"
          :disabled="isOptimizing"
          @submit="handleOptimizePrompt"
          @configModel="showConfig = true"
        >
          <template #model-select>
            <ModelSelectUI
              ref="optimizeModelSelect"
              :modelValue="selectedOptimizeModel"
              @update:modelValue="selectedOptimizeModel = $event"
              :disabled="isOptimizing"
              @config="showConfig = true"
            />
          </template>

          <template #template-select>
           <TemplateSelectUI
             v-model="selectedOptimizeTemplate"
             type="optimize"
            :templates="templatesWithLockIcons"
            @manage="openTemplateManager('optimize')"
           @select="handleTemplateSelect"
           />
         </template>
        </InputPanelUI>
      </div>

      <div class="flex-1 min-h-0 overflow-y-auto">
        <PromptPanelUI
          v-model:optimized-prompt="optimizedPrompt"
          :is-iterating="isIterating"
          v-model:selected-iterate-template="selectedIterateTemplate"
          :versions="currentVersions"
          :current-version-id="currentVersionId"
          @iterate="handleIteratePrompt"
          @openTemplateManager="openTemplateManager"
          @switchVersion="handleSwitchVersion"
        />
      </div>
    </ContentCardUI>

    <TestPanelUI
      :prompt-service="promptServiceRef"
      :original-prompt="prompt"
      :optimized-prompt="optimizedPrompt"
      v-model="selectedTestModel"
      @showConfig="showConfig = true"
    />

    <template #modals>
      <Teleport to="body">
        <ModelManagerUI
          v-if="showConfig"
          @close="handleModelManagerClose"
          @modelsUpdated="handleModelsUpdated"
          @select="handleModelSelect"
        />
      </Teleport>

      <Teleport to="body">
        <TemplateManagerUI
          v-if="showTemplates"
          :template-type="currentType"
          :selected-optimize-template="selectedOptimizeTemplate"
          :selected-iterate-template="selectedIterateTemplate"
          @close="handleTemplateManagerClose"
          @select="handleTemplateSelect"
        />
      </Teleport>

      <HistoryDrawerUI
        v-model:show="showHistory"
        :history="history"
        @reuse="handleSelectHistory"
        @clear="handleClearHistory"
        @deleteChain="handleDeleteChain"
      />

      <DataManagerUI
        :show="showDataManager"
        @close="handleDataManagerClose"
        @imported="handleDataImported"
      />
    </template>
  </MainLayoutUI>
</template>

<script setup lang="ts">
import { ref, onMounted, unref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ToastUI,
  ModelManagerUI,
  ThemeToggleUI,
  OutputPanelUI,
  PromptPanelUI,
  TemplateManagerUI,
  TemplateSelectUI,
  ModelSelectUI,
  HistoryDrawerUI,
  InputPanelUI,
  MainLayoutUI,
  ContentCardUI,
  ActionButtonUI,
  TestPanelUI,
  DataManagerUI,
  usePromptOptimizer,
  usePromptTester,
  useToast,
  usePromptHistory,
  useServiceInitializer,
  useTemplateManager,
  useModelManager,
  useHistoryManager,
  useModelSelectors,
  modelManager,
  templateManager,
  historyManager
} from '@prompt-optimizer/ui'

/* ---------- THEME ---------- */
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  document.documentElement.classList.remove('dark', 'theme-blue', 'theme-green', 'theme-purple')
  if (savedTheme) {
    document.documentElement.classList.add(savedTheme)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
  }
  
  // Hide the purple logo img
  setTimeout(() => {
    const logo = document.querySelector('img.h-8.w-8.rounded-lg')
    if (logo) {
      (logo as HTMLElement).style.display = 'none'
    }
  }, 100)
  
  // Try to modify template display in the DOM
  const modifyTemplateDisplay = () => {
    console.log('🎨 Attempting to modify template display in DOM...')
    
    // Map of template names to check for
    const proTemplateNames = {
      'Professional Email Generator': true,
      'Resume & Achievement Writer': true,
      'Cover Letter Generator': true,
      'SEO Blog Post Generator': true,
      'YouTube Script Generator': true,
      'Ad Copy Generator': true
    }
    
    // Get all elements and check their text content
    const allElements = document.querySelectorAll('*')
    let modified = 0
    
    allElements.forEach((el: any) => {
      // Skip if element has children (to avoid modifying parent containers)
      if (el.children.length > 0) return
      
      const text = el.textContent || ''
      const trimmedText = text.trim()
      
      // Check if this element contains a pro template name
      Object.keys(proTemplateNames).forEach(templateName => {
        if (trimmedText === templateName || trimmedText.startsWith(templateName)) {
          if (!text.includes('🔒')) {
            console.log('🔒 Found pro template in DOM:', trimmedText)
            el.textContent = `${text} 🔒`
            modified++
          }
        }
      })
    })
    
    if (modified > 0) {
      console.log(`✅ Modified ${modified} template displays`)
    }
  }
  
  // Try multiple times as dropdown might not be rendered immediately
  setTimeout(modifyTemplateDisplay, 500)
  setTimeout(modifyTemplateDisplay, 1000)
  setTimeout(modifyTemplateDisplay, 1500)
  setTimeout(modifyTemplateDisplay, 2000)
  
  // Also try when clicking anywhere on the document
  document.addEventListener('click', (e) => {
    // Only run if clicking near the template select area
    const target = e.target as HTMLElement
    if (target.closest('.template-select') || target.closest('[role="combobox"]') || target.closest('[role="listbox"]')) {
      console.log('👆 Click detected near template selector')
      setTimeout(modifyTemplateDisplay, 100)
      setTimeout(modifyTemplateDisplay, 300)
      setTimeout(modifyTemplateDisplay, 500)
    }
  })
  
  // Watch for DOM changes (dropdown opening)
  const observer = new MutationObserver(() => {
    console.log('👁️ DOM mutation detected')
    modifyTemplateDisplay()
  })
  
  // Start observing after a delay to ensure component is mounted
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }, 1000)
})

/* ---------- TOAST / I18N ---------- */
const toast = useToast()
const { t } = useI18n()

/* ---------- SERVICE INITIALIZATION ---------- */
const { promptServiceRef } = useServiceInitializer(modelManager, templateManager, historyManager)

/* ---------- MODEL SELECTORS & MANAGER ---------- */
const { optimizeModelSelect, testModelSelect } = useModelSelectors()

const {
  showConfig,
  selectedOptimizeModel,
  selectedTestModel,
  handleModelManagerClose,
  handleModelsUpdated,
  handleModelSelect
} = useModelManager({
  modelManager,
  optimizeModelSelect,
  testModelSelect
})

/* ---------- PROMPT OPTIMIZER COMPOSABLE ---------- */
const {
  prompt,
  optimizedPrompt,
  isOptimizing,
  isIterating,
  selectedOptimizeTemplate,
  selectedIterateTemplate,
  currentVersions,
  currentVersionId,
  currentChainId,
  handleOptimizePrompt,
  handleIteratePrompt,
  handleSwitchVersion,
  saveTemplateSelection
} = usePromptOptimizer(
  modelManager,
  templateManager,
  historyManager,
  promptServiceRef,
  selectedOptimizeModel,
  selectedTestModel
)

/* ---------- HISTORY ---------- */
const {
  history,
  handleSelectHistory: handleSelectHistoryBase,
  handleClearHistory: handleClearHistoryBase,
  handleDeleteChain: handleDeleteChainBase
} = usePromptHistory(
  historyManager,
  prompt,
  optimizedPrompt,
  currentChainId,
  currentVersions,
  currentVersionId
)

const {
  showHistory,
  handleSelectHistory,
  handleClearHistory,
  handleDeleteChain
} = useHistoryManager(
  historyManager,
  prompt,
  optimizedPrompt,
  currentChainId,
  currentVersions,
  currentVersionId,
  handleSelectHistoryBase,
  handleClearHistoryBase,
  handleDeleteChainBase
)

/* ---------- TEMPLATE MANAGER ---------- */
const {
  showTemplates,
  currentType,
  handleTemplateSelect: originalHandleTemplateSelect,
  openTemplateManager,
  handleTemplateManagerClose
} = useTemplateManager({
  selectedOptimizeTemplate,
  selectedIterateTemplate,
  saveTemplateSelection,
  templateManager
})

// Wrapper to track user interaction
const handleTemplateSelect = (template: any) => {
  hasUserActuallySelectedTemplate.value = true
  originalHandleTemplateSelect(template)
}

/* ---------- DATA MANAGER ---------- */
const showDataManager = ref(false)
const handleDataManagerClose = () => (showDataManager.value = false)

/* ---------- USER INTERACTION FLAG ---------- */
const hasUserActuallySelectedTemplate = ref(false)

/* ---------- TEMPLATES WITH LOCK ICONS ---------- */
const templatesWithLockIcons = computed(() => {
  const templates = templateManager.getTemplates?.('optimize') || []
  return templates.map((template: any) => ({
    ...template,
    name: `${template.name}${proTemplateIds.includes(template.id) ? ' 🔒' : ''}`,
    displayName: `${template.name}${proTemplateIds.includes(template.id) ? ' 🔒' : ''}`
  }))
})

const handleDataImported = () => {
  toast.success(t('dataManager.import.successWithRefresh'))
  setTimeout(() => window.location.reload(), 1000)
}

/* ------------------------------------------------------------------ */
/*                    🔒  SIMPLE, BULLET-PROOF PRO LOCK                */
/* ------------------------------------------------------------------ */

const userIsPro = localStorage.getItem('userPlan') === 'pro'

// List every template ID that should be locked
const proTemplateIds = [
  'seo-article-writer',
  'resume-builder',
  'cover-letter-coach',
  'email-writer',
  'yt-script-writer',
  'ad-copy-writer'
]

const upgradeToPro = () => {
  window.open('https://your-stripe-link.com', '_blank')
}

// Add this helper function before your watcher
const extractTemplateId = (templateValue: any) => {
  console.log('🔍 Extracting from:', templateValue)
  
  if (!templateValue) return null
  
  // If it's a string, return as-is
  if (typeof templateValue === 'string') {
    return templateValue
  }
  
  // If it's an object, try common property names
  if (typeof templateValue === 'object') {
    const possibleKeys = [
      'templateId', 'id', 'value', 'key', 'name', 
      'template_id', 'template', 'identifier'
    ]
    
    for (const key of possibleKeys) {
      if (templateValue[key]) {
        console.log(`✅ Found template ID "${templateValue[key]}" using key "${key}"`)
        return templateValue[key]
      }
    }
    
    // If no standard keys found, log the structure
    console.warn('⚠️ No template ID found in object:', Object.keys(templateValue))
  }
  
  return null
}

// Replace your existing watcher with this:
watch(selectedOptimizeTemplate, (newVal) => {
  const raw = unref(newVal)
  const templateId = extractTemplateId(raw)
  
  console.log('🪪 Selected template ID:', templateId)
  console.log('🪪 User selected:', hasUserActuallySelectedTemplate.value)

  if (!templateId) {
    hasUserActuallySelectedTemplate.value = false
    return
  }

  if (proTemplateIds.includes(templateId) && !userIsPro && hasUserActuallySelectedTemplate.value) {
    toast.error('🚫 This template is for Pro users only. Please upgrade to access premium templates.')
    selectedOptimizeTemplate.value = null
    hasUserActuallySelectedTemplate.value = false
    return
  }
})
</script>

<style scoped>
/* Hide only the purple logo img */
:deep(img.h-8.w-8.rounded-lg) {
  display: none !important;
}
</style>