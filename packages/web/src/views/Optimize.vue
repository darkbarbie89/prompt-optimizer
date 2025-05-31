
<template>
  <!-- ===== Prompt-Optimizer tool page ===== -->
  <MainLayoutUI>
    <template #title>
      {{ $t('promptOptimizer.title') }}
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
})

/* ---------- TOAST / I18N ---------- */
const toast = useToast()
const { t } = useI18n()

/* ---------- SERVICE INITIALIZATION ---------- */
const { promptServiceRef } =
  useServiceInitializer(modelManager, templateManager, historyManager)

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
  hasUserActuallySelectedTemplate.value = true;
  originalHandleTemplateSelect(template);
};

/* ---------- DATA MANAGER ---------- */
const showDataManager = ref(false)
const handleDataManagerClose = () => (showDataManager.value = false)
/* ---------- USER INTERACTION FLAG ---------- */
const hasUserActuallySelectedTemplate = ref(false);

/* ---------- TEMPLATES WITH LOCK ICONS ---------- */
const templatesWithLockIcons = computed(() => {
  const templates = templateManager.getTemplates?.('optimize') || [];
  return templates.map(template => ({
    ...template,
    name: `${template.name}${proTemplateIds.includes(template.id) ? ' 🔒' : ''}`,
    displayName: `${template.name}${proTemplateIds.includes(template.id) ? ' 🔒' : ''}`
  }));
});

const handleDataImported = () => {
  toast.success(t('dataManager.import.successWithRefresh'))
  setTimeout(() => window.location.reload(), 1000)
}

/* ------------------------------------------------------------------ */
/*                    🔒  SIMPLE, BULLET-PROOF PRO LOCK                */
/* ------------------------------------------------------------------ */


const userIsPro = localStorage.getItem('userPlan') === 'pro';

// 1️⃣  List every template ID that should be locked
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
};

// Add this helper function before your watcher
const extractTemplateId = (templateValue) => {
  console.log('🔍 Extracting from:', templateValue);
  
  if (!templateValue) return null;
  
  // If it's a string, return as-is
  if (typeof templateValue === 'string') {
    return templateValue;
  }
  
  // If it's an object, try common property names
  if (typeof templateValue === 'object') {
    const possibleKeys = [
      'templateId', 'id', 'value', 'key', 'name', 
      'template_id', 'template', 'identifier'
    ];
    
    for (const key of possibleKeys) {
      if (templateValue[key]) {
        console.log(`✅ Found template ID "${templateValue[key]}" using key "${key}"`);
        return templateValue[key];
      }
    }
    
    // If no standard keys found, log the structure
    console.warn('⚠️ No template ID found in object:', Object.keys(templateValue));
  }
  
  return null;
};

// Replace your existing watcher with this:
watch(selectedOptimizeTemplate, (newVal) => {
  const raw = unref(newVal);
  const templateId = extractTemplateId(raw);
  
  console.log('🪪 Selected template ID:', templateId);
  console.log('🪪 User selected:', hasUserActuallySelectedTemplate.value);

  if (!templateId) {
    hasUserActuallySelectedTemplate.value = false;
    return;
  }

  if (proTemplateIds.includes(templateId) && !userIsPro && hasUserActuallySelectedTemplate.value) {
    toast.error('🚫 This template is for Pro users only.');
    selectedOptimizeTemplate.value = null;
    hasUserActuallySelectedTemplate.value = false;
    return;
  }

  if (hasUserActuallySelectedTemplate.value) {
    handleOptimizePrompt();
  }
});
</script>

