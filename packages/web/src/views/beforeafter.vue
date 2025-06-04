<template>
  <section class="bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
        See the Difference with Prompt Optimization
      </h2>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div class="bg-white shadow-md rounded-lg p-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            <span class="inline-block bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">Original</span>
            Prompt Output
          </h3>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-500 bg-gray-50 rounded-md p-2 mb-2 font-mono">{{ originalPrompt }}</p>
            <p class="text-base text-gray-800 bg-white rounded-md shadow-inner p-4 font-mono">{{ originalOutput }}</p>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            <span class="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">Optimized</span>
            Prompt Output  
          </h3>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-500 bg-gray-50 rounded-md p-2 mb-2 font-mono">{{ optimizedPrompt }}</p>
            <p class="text-base text-gray-800 bg-white rounded-md shadow-inner p-4 font-mono">{{ optimizedOutput }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  originalPrompt: String,
  originalOutput: String, 
  optimizedPrompt: String,
  optimizedOutput: String
})
</script>
