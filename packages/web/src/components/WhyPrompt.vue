<!-- src/components/WhyPrompt.vue -->
<template>
  <!-- Features section -->
  <section
    id="features"
    class="relative z-10 bg-white py-20 sm:py-28 "
>


    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-base font-bold uppercase tracking-wider text-indigo-700">
        Features
      </p>
      <h2 class="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Why&nbsp;Prompt&nbsp;Optimizer?
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
        Everything you need to craft world-class prompts
        with less trial-and-error and better, measurable results.
      </p>

      <!-- Feature cards -->
      <dl class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center text-center"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50"
          >
            <component
              :is="feature.icon"
              class="h-6 w-6 text-indigo-600"
              aria-hidden="true"
            />
          </div>
          <dt class="mt-4 text-base font-semibold text-gray-900">
            {{ feature.title }}
          </dt>
          <dd class="mt-2 text-sm text-gray-600">
            {{ feature.description }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  BoltIcon,
  ChartBarIcon,
  LightBulbIcon,
  DevicePhoneMobileIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

interface Feature {
  title: string
  description: string
  icon: any
}

const features: Feature[] = [
  {
    title: 'Faster Results',
    description: 'Save hours crafting prompts—our AI does it instantly.',
    icon: ClockIcon,
  },
  {
    title: 'Higher Accuracy',
    description: 'Iterative refinement ensures better output from GPT and other models.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Version Comparison',
    description: 'See prompt versions side-by-side and pick the winner.',
    icon: ChartBarIcon,
  },
  {
    title: 'Template Library',
    description: 'Ready-made templates for common use-cases—no blank-page anxiety.',
    icon: BoltIcon,
  },
  {
    title: 'Mobile Friendly',
    description: 'Work seamlessly on any device—phone, tablet, or desktop.',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Smart Suggestions',
    description: 'AI hints help you iterate and improve prompts on the fly.',
    icon: LightBulbIcon,
  },
]
</script>
