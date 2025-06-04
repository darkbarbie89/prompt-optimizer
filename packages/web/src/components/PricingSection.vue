<template>
  <section class="py-24 bg-gradient-to-b from-gray-100 to-white" id="pricing">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-base font-semibold tracking-wide text-indigo-600 uppercase mb-4">Simple pricing</h2>
      <p class="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">Choose the plan that fits you best</p>
      <p class="text-xl text-gray-500 max-w-3xl mx-auto">Start with Free, grow with Pro, scale with Enterprise.</p>
    </div>

    <div class="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 sm:px-6 lg:px-8">

      <!-- Free Plan -->
      <div class="bg-white rounded-2xl shadow-xl p-8 flex flex-col">
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Free</h3>
        <p class="text-5xl font-bold text-gray-900 mb-6">$0<span class="text-2xl font-medium ml-1">/month</span></p>
        <ul class="text-lg text-gray-600 space-y-4 flex-grow mb-8">
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Basic optimizations
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            1,000 tokens / month
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Community support
          </li>
        </ul>
        <RouterLink to="/optimize" class="mt-auto py-3 px-6 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition duration-200">Start Free</RouterLink>
      </div>

      <!-- Pro Plan (Highlighted) -->
      <div class="bg-indigo-600 rounded-2xl shadow-2xl p-8 flex flex-col scale-105 transform origin-bottom">
        <h3 class="text-2xl font-semibold text-white flex items-center justify-center mb-4">
          Pro
          <span class="ml-3 inline-block bg-indigo-800 text-white text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
        </h3>
        <p class="text-5xl font-bold text-white mb-6">$9<span class="text-2xl font-medium ml-1">/month</span></p>
        <ul class="text-lg text-indigo-100 space-y-4 flex-grow mb-8">
          <li class="flex items-center">
            <svg class="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Unlimited optimizations
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            All advanced templates
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            50,000 tokens / month
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Priority e-mail support
          </li>
        </ul>
        <RouterLink to="/optimize" class="mt-auto py-3 px-6 bg-white text-indigo-700 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition duration-200">Upgrade to Pro</RouterLink>
      </div>

      <!-- Enterprise Plan -->
      <div class="bg-white rounded-2xl shadow-xl p-8 flex flex-col">
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Enterprise</h3>
        <p class="text-5xl font-bold text-gray-900 mb-6">$49<span class="text-2xl font-medium ml-1">/month</span></p>
        <ul class="text-lg text-gray-600 space-y-4 flex-grow mb-8">
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Unlimited tokens
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            API access
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Team accounts (5+ users)
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Dedicated support
          </li>
        </ul>
        <RouterLink to="/optimize" class="mt-auto py-3 px-6 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition duration-200">Contact Sales</RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>