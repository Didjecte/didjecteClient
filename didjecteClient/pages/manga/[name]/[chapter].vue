<template>
    <div class="flex">
      <span>chapter: {{ $route.params.chapter }}</span>
    </div>
  </template>
  
  <script>
    export default {
      mounted() {
        const route = useRoute()
  
        // When accessing /posts/1, route.params.id will be 1
        console.log(route.params)
  
      },
      // created() {
      //   this.$watch(
      //     () => this.$route.params,
      //     (toParams, previousParams) => {
      //       // react to route changes...
      //     }
      //   )
      // },
      data () {
        return {
          visible: false,
        }
      }
    }
  </script>