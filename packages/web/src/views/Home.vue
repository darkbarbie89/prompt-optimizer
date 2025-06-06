<template>
  <div class="min-h-screen">
    <!-- Floating Menu Bar -->
    <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto">
      <nav class="flex items-center gap-10 px-8 py-3 bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-100">
        <!-- Logo -->
        <RouterLink to="/" class="flex-shrink-0 group">
          <img 
            :src="Logo" 
            alt="Prompt Optimizer" 
            class="h-8 w-auto transform group-hover:scale-105 transition-transform duration-200"
          >
        </RouterLink>

        <!-- Navigation Links -->
        <div class="flex items-center gap-8">
          <a 
            v-for="link in navLinks" 
            :key="link.path"
            :href="link.path" 
            @click="scrollToSection($event, link.path)"
            class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            {{ link.name }}
          </a>
        </div>
      </nav>
    </div>

    <!-- Mobile Floating Menu -->
    <div class="fixed top-4 right-4 z-50 md:hidden">
      <button 
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="p-3 bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-100"
      >
        <svg v-if="!mobileMenuOpen" class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="mobileMenuOpen" class="fixed top-16 right-4 z-40 md:hidden">
        <div class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[200px]">
          <RouterLink 
            to="/"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <img :src="Logo" alt="Prompt Optimizer" class="h-8 w-auto">
          </RouterLink>
          <a 
            v-for="link in navLinks" 
            :key="link.path"
            :href="link.path"
            @click="mobileMenuOpen = false; scrollToSection($event, link.path)"
            class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main>
      <HeroSection />
      <WhyPrompt />
      
      <BeforeAfter 
        :original-prompt="sampleOriginalPrompt"
        :original-output="sampleOriginalOutput"
        :optimized-prompt="sampleOptimizedPrompt"
        :optimized-output="sampleOptimizedOutput"
      />
      
      <FeatureSection id="features" />
      <PricingSection id="pricing" />
      <CallToActionSection id="contact" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import HeroSection from "../components/HeroSection.vue";
import WhyPrompt from "../components/WhyPrompt.vue";
import BeforeAfter from "../components/BeforeAfter.vue";
import FeatureSection from "../components/FeatureSection.vue";
import PricingSection from "../components/PricingSection.vue";
import CallToActionSection from "../components/CallToActionSection.vue";
import Logo from '../assets/prompt.png';

// Navigation state
const mobileMenuOpen = ref(false);

// Navigation links
const navLinks = [
  { name: 'Features', path: '#features' },
  { name: 'Pricing', path: '#pricing' },
  { name: 'Contact', path: '#contact' }
];

// Scroll to section function
const scrollToSection = (event: Event, path: string) => {
  event.preventDefault();
  const sectionId = path.replace('#', '');
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Sample data for the BeforeAfter component
const sampleOriginalPrompt = "I need a cover letter for a UX job";
const sampleOriginalOutput = "Dear Hiring Manager, I am writing to express my interest in the UX Designer position at your company. With X years of experience in user experience design, I have honed my skills in creating intuitive interfaces that prioritizes user needs and deliver exceptional results. I am eager to bring my expertise in wireframing, prototyping, and user testing to your team. Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your organization.";
const sampleOptimizedPrompt = "Write a conversational cover letter for a UX Designer role at PixelWave...";
const sampleOptimizedOutput = "Hey there PixelWave team, I hope you're all doing well! I couldn't help but feel drawn to your work after stumbling across one of your projects that reimagined the way people interact with technology. It was like a breath of fresh air in the often cluttered world of digital design. The innovative culture at PixelWave truly resonated with me, and I knew I had to be a part of it. Let me tell you about the time I revamped a set of complex dashboards for a client...";
</script>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar for mobile menu if needed */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
