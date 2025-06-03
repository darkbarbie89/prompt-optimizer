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
      <div v-if="!userIsPro" class="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-2">
        <span class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
          {{ getRemainingUses }} free uses left
        </span>
      </div>
      <div v-else class="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 rounded-lg mr-2">
        <span class="text-sm font-medium text-green-800 dark:text-green-200">
          ✨ Pro User
        </span>
      </div>
      <ActionButtonUI v-if="!userIsPro" icon="🚀" text="Upgrade to Pro" @click="upgradeToPro" />
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
      
      <!-- Email Verification Modal -->
      <Teleport to="body">
        <div v-if="showEmailVerification" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 class="text-xl font-bold mb-4">🔐 Activate Pro Access</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Enter the email you used to purchase Pro access:
            </p>
            
            <input
              v-model="verificationEmail"
              type="email"
              placeholder="your@email.com"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-2"
              @keyup.enter="verifyProEmail"
            />
            
            <p v-if="verificationError" class="text-red-500 text-sm mb-4">
              {{ verificationError }}
            </p>
            
            <p class="text-sm text-gray-500 mb-4">
              Demo emails: <code>demo@example.com</code> or <code>pro@example.com</code>
            </p>
            
            <div class="flex gap-2">
              <button
                @click="verifyProEmail"
                class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Verify Email
              </button>
              <button
                @click="showEmailVerification = false; verificationError = ''"
                class="flex-1 bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Teleport>
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
  handleOptimizePrompt: originalHandleOptimizePrompt,
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

// Wrap the optimize handler to check usage limit
const handleOptimizePrompt = async () => {
  // Check if free user has reached limit
  if (hasReachedLimit()) {
    toast.error(`🚫 You've reached your free limit of ${USAGE_LIMIT} optimizations. Please upgrade to Pro for unlimited access!`)
    // Show upgrade modal or redirect
    setTimeout(() => {
      upgradeToPro()
    }, 500)
    return
  }
  
  // If not at limit, proceed with optimization
  try {
    await originalHandleOptimizePrompt()
    
    // Only increment usage if optimization was successful and user is not pro
    if (!userIsPro.value) {
      incrementUsage()
      const remaining = getRemainingUses.value
      
      // Show usage notification
      if (remaining > 0) {
        toast.info(`✅ Optimization complete! You have ${remaining} free uses remaining.`)
      } else {
        toast.warning(`⚠️ This was your last free optimization. Upgrade to Pro for unlimited access!`)
      }
      
      console.log(`📊 Usage updated: ${usageCount.value}/${USAGE_LIMIT}`)
    }
  } catch (error) {
    console.error('Optimization failed:', error)
    // Don't increment usage on error
  }
}

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
/*  
    MONETIZATION SYSTEM - READY FOR STRIPE INTEGRATION
    
    Current Features:
    - ✅ Free tier: 5 optimizations
    - ✅ Pro tier: Unlimited access with email verification
    - ✅ Template locking (6 pro templates)
    - ✅ Usage tracking in localStorage
    - ✅ Upgrade prompts and CTAs
    - ✅ Simple email-based pro access
    
    To integrate Stripe (included instructions):
    1. Create Stripe account
    2. Set up Payment Link or Checkout
    3. Replace upgradeToPro() URL with your payment link
    4. Add webhook to update pro emails list
    5. Start earning!
    
    Test pro features: 
    - Run in console: localStorage.setItem('userPlan', 'pro'); location.reload();
*/

// Simple email-based pro user list (in production, this would be in a database)
// For demo/Flippa purposes, using a hardcoded list
const PRO_USER_EMAILS = [
  'demo@example.com',
  'pro@example.com',
  // Buyer can add emails here or connect to a database
]

// Check if email is in pro list
const isProEmail = (email: string) => {
  return PRO_USER_EMAILS.includes(email.toLowerCase().trim())
}

// Get stored pro email
const getStoredProEmail = () => {
  return localStorage.getItem('proUserEmail')
}

// Check if user is pro (either by email or localStorage)
const userIsPro = computed(() => {
  const planIsPro = localStorage.getItem('userPlan') === 'pro'
  const emailIsPro = getStoredProEmail() && isProEmail(getStoredProEmail()!)
  return planIsPro || emailIsPro
})

// Show email verification modal
const showEmailVerification = ref(false)
const verificationEmail = ref('')
const verificationError = ref('')

// Verify pro email
const verifyProEmail = () => {
  const email = verificationEmail.value.toLowerCase().trim()
  
  if (!email) {
    verificationError.value = 'Please enter your email'
    return
  }
  
  if (!email.includes('@')) {
    verificationError.value = 'Please enter a valid email'
    return
  }
  
  if (isProEmail(email)) {
    // Valid pro user
    localStorage.setItem('proUserEmail', email)
    localStorage.setItem('userPlan', 'pro')
    showEmailVerification.value = false
    toast.success('✅ Pro access activated! Welcome back!')
    setTimeout(() => location.reload(), 1000)
  } else {
    verificationError.value = 'Email not found. Please check your purchase email or contact support.'
  }
}

// Usage tracking for free users
const USAGE_LIMIT = 5
const USAGE_KEY = 'promptOptimizerUsage'
const USAGE_RESET_KEY = 'promptOptimizerUsageReset'

// Reactive usage count
const usageCount = ref(0)

// Get current usage count
const getUsageCount = () => {
  const usage = localStorage.getItem(USAGE_KEY)
  return usage ? parseInt(usage, 10) : 0
}

// Update reactive usage count
const updateUsageCount = () => {
  usageCount.value = getUsageCount()
}

// Increment usage count
const incrementUsage = () => {
  const currentUsage = getUsageCount()
  const newUsage = currentUsage + 1
  localStorage.setItem(USAGE_KEY, newUsage.toString())
  updateUsageCount()
  return newUsage
}

// Check if user has reached limit
const hasReachedLimit = () => {
  return !userIsPro.value && getUsageCount() >= USAGE_LIMIT
}

// Get remaining uses (reactive)
const getRemainingUses = computed(() => {
  if (userIsPro.value) return 'Unlimited'
  return Math.max(0, USAGE_LIMIT - usageCount.value)
})

// Reset usage (optional - for testing or daily reset)
const resetUsage = () => {
  localStorage.setItem(USAGE_KEY, '0')
  localStorage.setItem(USAGE_RESET_KEY, new Date().toISOString())
  updateUsageCount()
}

// Demo mode for Flippa buyers to test
const enableDemoMode = () => {
  localStorage.setItem('userPlan', 'pro')
  localStorage.setItem('demoMode', 'true')
  toast.success('🎉 Demo Pro mode activated! Refresh to see all features.')
  setTimeout(() => location.reload(), 1500)
}

// Add demo mode info to onMounted
onMounted(() => {
  updateUsageCount()
  if (!userIsPro) {
    console.log(`📊 Usage: ${usageCount.value}/${USAGE_LIMIT}`)
    console.log(`🎯 Remaining uses: ${getRemainingUses.value}`)
    console.log('💡 Tip: Run enableDemoMode() in console to test Pro features')
  }
  
  // Check if in demo mode
  if (localStorage.getItem('demoMode') === 'true') {
    toast.info('👋 Demo mode active - All Pro features unlocked for testing!')
  }
})

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
  // Show options: buy new or verify existing
  const message = `
🚀 Upgrade to Pro - Choose an option:

1️⃣ Already purchased? Click OK to enter your email
2️⃣ Want to purchase? Click Cancel to see pricing

For demo purposes, use: demo@example.com
  `
  
  if (confirm(message)) {
    // Show email verification
    showEmailVerification.value = true
  } else {
    // Show purchase info
    const purchaseInfo = `
💎 Pro Plan Benefits:
✅ Unlimited optimizations
✅ Access to all pro templates
✅ Priority support
✅ Email-based access (use anywhere)

This is a demo. In production:
- Connects to Stripe for payment
- Automatically adds email to pro list
- Instant activation

For Flippa buyers: Full integration guide included!
    `
    alert(purchaseInfo)
  }
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

  if (proTemplateIds.includes(templateId) && !userIsPro.value && hasUserActuallySelectedTemplate.value) {
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