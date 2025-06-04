<template>
  <div class="pb-0">
    <HeroSection />
    <WhyPrompt />
    
    <BeforeAfter 
      :original-prompt="sampleOriginalPrompt"
      :original-output="sampleOriginalOutput"
      :optimized-prompt="sampleOptimizedPrompt"
      :optimized-output="sampleOptimizedOutput"
    />
    
    <FeatureSection />
    <PricingSection />
    <CallToActionSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import WhyPrompt from "../components/WhyPrompt.vue";
import BeforeAfter from "../components/BeforeAfter.vue";
import FeatureSection from "../components/FeatureSection.vue";
import PricingSection from "../components/PricingSection.vue";
import CallToActionSection from "../components/CallToActionSection.vue";

// Sample data for the BeforeAfter component
const sampleOriginalPrompt = "I need a cover letter for a UX job";
const sampleOriginalOutput = "Dear Hiring Manager, I am writing to express my interest in the UX Designer position at your company. With X years of experience in user experience design, I have honed my arskills in creating intuitive interfaces that prioritizes user needs and deliver exceptional results. I am eager to bring my expertise in wireframing, prototyping, and user testing to your team. Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your organization.";
const sampleOptimizedPrompt = "Write a conversational cover letter for a UX Designer role at PixelWave...";
const sampleOptimizedOutput = "Hey there PixelWave team, I hope you're all doing well! I couldn't help but feel drawn to your work after stumbling across one of your projects that reimagined the way people interact with technology. It was like a breath of fresh air in the often cluttered world of digital design. The innovative culture at PixelWave truly resonated with me, and I knew I had to be a part of it. Let me tell you about the time I revamped a set of complex dashboards for a client...";
</script>
