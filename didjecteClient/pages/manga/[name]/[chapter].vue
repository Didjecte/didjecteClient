<template>
    <div class="flex">
      <span>chapter: {{ $route.params.chapter }}</span>
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
          visible: false,
          chapter: '',
        }
      },
      mounted() {
        const route = useRoute()
  
        // When accessing /posts/1, route.params.id will be 1
        console.log(route.params)
        this.chapter = route.params.chapter
  
      },
      // created() {
      //   this.$watch(
      //     () => this.$route.params,
      //     (toParams, previousParams) => {
      //       // react to route changes...
      //     }
      //   )
      // },
      methods: {
        coverUrl() {
          //works but be specific or it will load performance
          const url = import.meta.glob('~/assets/images/manga/**/cover.jpg', {
            eager: true,
            import: 'default',
          })
          return url['/assets/images/manga/' + title + '/cover.jpg']
        },
      }
    }
  </script>