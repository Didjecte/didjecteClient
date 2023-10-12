<template>
  <NuxtLayout>
    <div>
      <div class="text-2xl font-bold mb-5">Sorry</div>
      <div>{{ error.statusCode }}</div>
      <div>{{ error.status }} - {{ error.message }}</div>
      <div>
        <img src="~assets/images/sorry.gif" alt="404" />
      </div>
    </div>
  </NuxtLayout>
</template>
  

<script setup>
  defineProps(['error'])
</script>

<script>
  export default {
    props: {
      error: {
        type: Object,
        default: () => {}
      }
    },
    
    beforeCreate() {
      setPageLayout('default')
    }
  }
</script>
<style scoped>
</style>