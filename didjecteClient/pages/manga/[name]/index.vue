<template>
    <div class="flex">
      <div class="basis-1/2">
        <Image :src="coverUrl()" alt="Image" width="250" />
      </div>
      <div class="basis-1/2">
        <span>Manga: {{ $route.params.name }}</span>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
          visible: false,
        }
      },
      // created() {
      //   this.$watch(
      //     () => this.$route.params,
      //     (toParams, previousParams) => {
      //       // react to route changes...
      //     }
      //   )
      // },
      mounted() {
        const route = useRoute()
        console.log(route.params)
        this.coverUrl()
        console.log(this.coverUrl())

      },
      methods: {
        async coverUrl () {
          try{ 
            const url = await new URL(`@/assets/images/manga/didjecte/cover.jpg`, import.meta.url).href
          }
          catch (error) {
            
          }
        }
      }
    }
  </script>