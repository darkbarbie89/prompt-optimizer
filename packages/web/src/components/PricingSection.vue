<template>
  <section class="py-24 bg-white" id="pricing">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-base font-semibold tracking-wide text-indigo-600 uppercase">Simple pricing</h2>
      <p class="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">Choose the plan that fits you best</p>
      <p class="mt-4 text-lg text-gray-500">Start with Free, grow with Pro, scale with Enterprise.</p>
    </div>

    <div class="mt-16 flex flex-col lg:flex-row gap-6 justify-center items-stretch px-4 sm:px-6 lg:px-8">

      <!-- Free Plan -->
      <div class="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900">Free</h3>
        <p class="mt-1 text-3xl font-bold text-gray-900">$0<span class="text-base font-medium">/month</span></p>
        <ul class="mt-4 text-sm text-gray-500 space-y-2 text-left">
          <li>✓ Basic optimizations</li>
          <li>✓ 1,000 tokens / month</li>
          <li>✓ Community support</li>
        </ul>
        <button class="mt-6 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md font-medium">Start Free</button>
      </div>

      <!-- Pro Plan (Highlighted) -->
      <div class="flex-1 bg-indigo-50 border-2 border-indigo-600 rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-indigo-700">Pro <span class="ml-2 inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded">Most Popular</span></h3>
        <p class="mt-1 text-3xl font-bold text-gray-900">$9<span class="text-base font-medium">/month</span></p>
        <ul class="mt-4 text-sm text-gray-700 space-y-2 text-left">
          <li>✓ Unlimited optimizations</li>
          <li>✓ All advanced templates</li>
          <li>✓ 50,000 tokens / month</li>
          <li>✓ Priority e-mail support</li>
        </ul>
        <button class="mt-6 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium">Upgrade to Pro</button>
      </div>

      <!-- Enterprise Plan -->
      <div class="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900">Enterprise</h3>
        <p class="mt-1 text-3xl font-bold text-gray-900">$49<span class="text-base font-medium">/month</span></p>
        <ul class="mt-4 text-sm text-gray-500 space-y-2 text-left">
          <li>✓ Unlimited tokens</li>
          <li>✓ API access</li>
          <li>✓ Team accounts (5+ users)</li>
          <li>✓ Dedicated support</li>
        </ul>
        <button class="mt-6 w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-md font-medium">Contact Sales</button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
</script>
