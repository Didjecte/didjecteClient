<template>
  <div class="w-full">
    <h1 class="text-xl font-bold">
      Manga
    </h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-6">
      <div v-for="manga in mangas">
        <!-- add variables-->
        <Card
          :pt="{
            root: {
              class: ''
            },
            body: {
              class: 'p-0'
            },
            header: {
              class: 'aspect-[3/4] overflow-hidden'
            },
            title: {
              class: 'text-md md:text-lg lg:text-xl font-bold capitalize my-2 truncate'
            },
            content: {
              class: 'p-0'
            }
          }">
          <template #header>
            <Nuxt-link :to="'/manga/' + manga.title">
              <img :alt="manga.title" :src="coverUrl(manga.title)" v-if="coverUrl(manga.title)"/>
              <Skeleton class="w-full !h-full" v-else></Skeleton>
            </Nuxt-link>
          </template>
          <template #title>
            <Nuxt-link :to="'/manga/' + manga.title">
              {{ manga.title }}
            </Nuxt-link>
          </template>
          <template #subtitle>
            <div class="flex items-center">
              <div>
                <Nuxt-link :to="'/manga/' + manga.title + '/' + manga.lastChapter.index">
                  <Chip>
                    <span class="text-sm text-gray-600 py-1">Chapter {{ manga.lastChapter.index}}</span>
                  </Chip>
                </Nuxt-link>
              </div>
              <div class="pl-2" v-if="checkNew(manga.lastChapter.date)">
                <Nuxt-link :to="'/manga/' + manga.title + '/' + manga.lastChapter.index">
                  <span class="bg-red-600 h-5 w-10 text-white text-xs rounded-md flex items-center justify-center">NEW</span>
                </Nuxt-link>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  // const getServiceIcon = async iconName => {
  //   const module = await import(/* @vite-ignore */ `./assets/images/manga/didjecte/cover.jpg`)
  //   return module.default.replace(/^\/@fs/, '')
  // }

  // const logo = ref()
  // watchEffect(async () => {
  //   logo.value = (await import(/* @vite-ignore */ `../assets/${props.imagePath}`)).default
  // })
  export default {  
    data () {
      return {  
        visible: false,
        active : ref(0),
        mangas : [
          {
              title: 'didjecte',
              lastChapter: {
                index: 4,
                date: new Date('2023-10-09'),
                pages: 24
              },
              summary: 'Didjecte est un manga de magie. Pif paf boom.',
              release: 2012,
              comments: []
          },
          {
              title: 'test',
              lastChapter: {
                index: 3,
                date: new Date('2023-9-09'),
                pages: 24
              },
              summary: 'Didjecte est un manga de magie. Pif paf boom.',
              release: 2012,
              comments: []
          },
          {
              title: 'test2',
              lastChapter: {
                index: 4,
                date: new Date('2023-9-15'),
                pages: 24
              },
              summary: 'Didjecte est un manga de magie. Pif paf boom.',
              release: 2012,
              comments: []
          },
        ]
      }
    },
    methods: {
      coverUrl(title) {
        //works but be specific or it will load performance
        const url = import.meta.glob('~/assets/images/manga/**/cover.jpg', {
          eager: true,
          import: 'default',
        })
        return url['/assets/images/manga/' + title + '/cover.jpg']
      },
      
      //check if chapter is new
      checkNew(chapterDate) {
        const today = new Date()
        const diffTime = Math.abs(today - chapterDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays < 28
      }
    }
  }
</script>
