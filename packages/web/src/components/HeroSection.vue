<!-- src/components/HeroSection.vue -->
<script setup lang="ts">
/* No script needed for now. If you later want dark‑mode image switching,
   you can import { useColorMode } from '@vueuse/core' here. */
</script>

<template>
  <!-- Radial fade + gentle diagonal highlight -->
  <section
    class="relative isolate overflow-hidden bg-white pt-40 sm:pt-52 pb-32
         before:absolute before:inset-0 before:-z-10
         before:bg-[radial-gradient(ellipse_at_top,_rgba(147,197,253,0.35),_transparent_70%)]
         after:absolute after:-z-10 after:inset-0
         after:bg-gradient-to-br after:from-white/40 after:via-transparent after:to-white"
  >
    <!-- Copy block -->
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl text-center">
        Experience the <span class="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
          Prompt&nbsp;Amplifier
        </span>
      </h1>

      <p class="mt-6 text-lg leading-8 text-gray-600">
        Super-charge your AI prompts with structure, clarity and strategy — in&nbsp;seconds, not hours.
      </p>

      <!-- CTA block -->
      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <!-- Primary: launches the tool -->
        <RouterLink
          to="/optimize"
          class="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg
                 ring-1 ring-indigo-700/10 hover:bg-indigo-700 focus:outline-none
                 focus-visible:outline-indigo-700"
        >
          Launch&nbsp;App
        </RouterLink>

        <!-- Secondary: learn more (scroll to features) -->
        <a
          href="#features"
          class="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-lg
                 ring-1 ring-indigo-600/20 hover:bg-gray-50 focus:outline-none
                 focus-visible:outline-indigo-700"
        >
          Learn&nbsp;More
        </a>
      </div>
    </div>

    <!-- Illustration -->
    <div class="relative mt-14 sm:mt-20">
      <!-- ⚠️ Replace the path below if your asset lives elsewhere -->
      <img
        src="@/assets/prompt-optimizer-ui.png"
        alt="Prompt Amplifier UI screenshot"
        class="mx-auto w-full max-w-4xl rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.5)] ring-2 ring-blue-400 mb-[-3rem] sm:mb-0"
     />
    </div>
  </section>
</template>
