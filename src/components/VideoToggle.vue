<template>
  <div>
    <!-- Toggle Button -->
    <div class="mt-4 flex justify-center cursor-pointer" @click="toggleVideo">
      <span class="text-xl font-semibold text-gray-500 dark:text-gray-400">
        {{ videoVisible ? '▲' : '▼' }} Watch Video
      </span>
    </div>

    <!-- Animated Video Section -->
    <transition name="slide-fade">
      <div
        v-if="videoVisible"
        class="w-full flex justify-center mb-10 mt-4"
      >
        <div class="w-[320px] sm:w-[360px] h-[640px] rounded-lg overflow-hidden">
          <iframe
            :src="youtubeUrl"
            class="w-full h-full"
            title="YouTube Shorts player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    youtubeUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      videoVisible: false,
    };
  },
  methods: {
    toggleVideo() {
      this.videoVisible = !this.videoVisible;
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
