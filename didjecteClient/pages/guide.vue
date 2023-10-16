<template>
  <div>
    <button @click="toggleVisibility">Toggle Visibility</button>

    <transition name="slide-fade">
      <div v-show="isVisible" class="content">Content to Show/Hide</div>
    </transition>
    <div>test</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  max-height: 1000px;
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  max-height: 1000px;
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  max-height: 0;
  opacity: 0;
}
</style>