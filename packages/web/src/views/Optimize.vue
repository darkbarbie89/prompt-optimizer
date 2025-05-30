
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
          v-model:selectedTemplate="selectedOptimizeTemplate"
          v-model:selectedModel="selectedOptimizeModel"
          :label="$t('promptOptimizer.originalPrompt')"
          :placeholder="$t('promptOptimizer.inputPlaceholder')"
          :model-label="$t('promptOptimizer.optimizeModel')"
          :template-label="$t('promptOptimizer.templateLabel')"
          :button-text="$t('promptOptimizer.optimize')"
          :loading-text="$t('common.loading')"
          :loading="isOptimizing"
          :disabled="isOptimizing"
          @submit="tryOptimize"
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
import { ref, onMounted, unref } from 'vue';
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
  const proTemplateIds = [
  'seo-article-writer',
  'resume-builder',
  'cover-letter-coach',
  'product-description',
  'yt-script-writer',
  'business-idea-tester',
  'ad-copy-writer',
  'habit-coach'
];


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
  handleTemplateSelect,
  openTemplateManager,
  handleTemplateManagerClose
} = useTemplateManager({
  selectedOptimizeTemplate,
  selectedIterateTemplate,
  saveTemplateSelection,
  templateManager
})

/* ---------- DATA MANAGER ---------- */
const showDataManager = ref(false)
const handleDataManagerClose = () => (showDataManager.value = false)
const handleDataImported = () => {
  toast.success(t('dataManager.import.successWithRefresh'))
  setTimeout(() => window.location.reload(), 1000)
}

/* ------------------------------------------------------------------ */
/*                    🔒  SIMPLE, BULLET-PROOF PRO LOCK                */
/* ------------------------------------------------------------------ */

const isProUser = false  // ← flip to true after payment flow

import { ref, onMounted, unref } from 'vue'; // Make sure 'unref' is imported

const isProUser = false;

const proTemplateIds = [
  'seo-article-writer',
  'resume-builder',
  'cover-letter-coach',
  'product-description',
  'yt-script-writer',
  'business-idea-tester',
  'ad-copy-writer',
  'habit-coach',
];

// Optional debug log to confirm
onMounted(() => {
  console.log('🟢 App mounted. Available Pro IDs:', proTemplateIds);
});

const tryOptimize = () => {
  toast.info('🔍 tryOptimize is running');

  // Unwrap ref from selected template
  const rawSelection = unref(selectedOptimizeTemplate);

  // Extract the template ID in any case
  const templateId =
    typeof rawSelection === 'string'
      ? rawSelection
      : rawSelection?.id ?? rawSelection?.templateId ?? 'UNKNOWN';

  console.log('🆔 templateId:', templateId);

  // Pro check
  const isPro = proTemplateIds.includes(templateId);

  if (isPro && !isProUser) {
    toast.error('🚫 This is a Pro template. Please upgrade to use it.');
    return;
  }

  handleOptimizePrompt();
};


const upgradeToPro = () => {
  window.open('https://your-stripe-link.com', '_blank')
}
</script>

