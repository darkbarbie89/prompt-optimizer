<template>
  <div class="upgrade-modal">
    <div class="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto mt-20">
      <h2 class="text-2xl font-bold mb-4">Upgrade to Pro</h2>
      <p class="text-gray-600 mb-4">Unlock premium features like advanced templates and more usage.</p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Upgrade Now</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.upgrade-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
