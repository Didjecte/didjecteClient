<template>
  <div>
    <div class="bg-gray-200">
      <div class="max-w-screen-xl mx-auto w-full mx-auto pt-5 pb-14 max-xl:px-8 max-sm:px-4">

        <!-- breadcrumb -->
        <div class="pb-4 text-blue-950/60 text-sm">
          <NuxtLink to="/" class="pi pi-home"></NuxtLink>
          <span class="pi pi-angle-right px-2"></span>
          <NuxtLink to="/manga" class=" inline-block align-[1px]">Manga</NuxtLink>
          <span class="pi pi-angle-right px-2"></span>
          <NuxtLink :to="'/manga/' + mangaTitle" class=" inline-block align-[1px] capitalize">{{ mangaTitle }}</NuxtLink>
        </div>

        <!-- manga description -->
        <div class="flex flex-wrap md:flex-nowrap w-full gap-5 md:gap-8">
          <div class="flex justify-center basis-full md:basis-1/4">
            <div class="w-60 md:w-auto aspect-[3/4] overflow-hidden bg-white items-center flex justify-center rounded-md" v-if="coverUrl()">
              <img :src="coverUrl()" alt="Image" class="w-5/6 aspect-[3/4]"/>
            </div>
            <div class="w-60 md:w-auto aspect-[3/4] overflow-hidden" v-else>
              <Skeleton class="w-full !h-full"></Skeleton>
            </div>
          </div>
          <div class="w-full basis-full md:basis-3/4">
            <Card
              :pt="{
                root: {
                  class: 'bg-white/50 dark:bg-gray-900 dark:text-white h-full rounded-md'
                },
                content: {
                  class: 'p-0 lg:py-3'
                }
              }">
              <template #content>
                <div>
                  <div class="text-2xl font-bold text-blue-600 capitalize items-left pb-2 lg:pb-4">
                    {{ mangaTitle }}
                  </div>
                  <div class="font-bold">
                    Genres
                  </div>
                  <div class="text-sm text-blue-950/70">
                    {{ manga.genre }}
                  </div>
                  <div class="font-bold">
                    Release
                  </div>
                  <div class="text-sm text-blue-950/70">
                    {{ manga.release }}
                  </div>
                  <div class="mt-3">
                    <Button label="Read First" size="small" class="mr-3" />
                    <Button label="Read Last" size="small" />
                  </div>
                  <div class="max-md:hidden">
                    <Divider />
                    <div class="font-bold">
                      Summary:
                    </div>
                    <div class="text-sm text-blue-950/70">
                      {{ manga.summary }}
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <!-- manga chapters -->
    <div class="max-w-screen-xl mx-auto w-full mx-auto py-5 max-xl:px-8 max-sm:px-4">
      <Panel 
        header="CHAPTERS"
        :pt="{
          header: {
            class: 'flex items-center justify-between border border-gray-300 bg-gray-100 rounded-t-md dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 p-5'
          },
          content: {
            class: 'pb-0 border border-gray-300 border-t-0 rounded-b-md dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80'
          }
        }">
        <DataTable 
          sortField="index"
          :sortOrder="-1"
          :value="chapters" 
          :row-hover="true"
          @row-click="chapterLink($event)"
          :pt="{
              bodyRow: ({ context }) => ({
                class: [
                  'border-b border-gray-300 dark:bg-gray-900 transition duration-200 dark:text-white/80 cursor-pointer hover:bg-gray-300/20 hover:text-gray-600',
                  {
                    '!border-0' : context.index === chapters.length - 1
                  }
                ]
              }),
            thead: {
              class:'hidden'
            }
          }"
          >
          <Column
            field="index"
            body-class="!rounded-b-md !border-0"
            :pt="{ 
              bodyCell: {
                class: 'w-3/5 sm:w-2/3 md:w-5/6'
              }
            }">
            <template #body="{data}">
              <span class="font-semibold ml-2">
                Chapter {{ data.index }}
              </span>
            </template>
          </Column>
          <Column 
            field="date" 
            :pt="{ 
              bodyCell: { 
                class: 'rounded-b-md'
              }
            }">
            <template #body="{data}">
              <span class="italic text-blue-950/60">
                {{ formattedDate(data.date) }}
              </span>
            </template>
          </Column>
        </DataTable>
      </Panel>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        home: {
          icon: 'pi pi-home',
          to: '/',
        },
        items: [
          {label: 'Computer'},
          {label: 'Notebook'},
          {label: 'Accessories'},
          {label: 'Backpacks'},
          {label: 'Item'}
        ],

        visible: false,
        mangaTitle: '',
        manga: {
          title: 'didjecte',
          lastChapter: {
            index: 4,
            date: new Date('2023-10-09'),
            pages: 24
          },
          genre: 'Magie, Combat, Comedy, Adventure',
          summary: 'Didjecte est un manga de magie. Pif paf boom.',
          release: 2012,
          comments: []
        },
        chapters: [
          {
            index: 1,
            date: new Date('2023-3-02'),
          },
          {
            index: 2,
            date: new Date('2023-5-22'),
          },
          {
            index: 3,
            date: new Date('2023-10-02'),
          },
        ]
      }
    },
    created() {
      const route = useRoute()
      this.mangaTitle = route.params.name
    },
    methods: {
      change(test) {
        return 'test' + test
      },
      coverUrl() {
        //works but be specific or it will load performance
        const url = import.meta.glob('~/assets/images/manga/**/cover.jpg', {
          eager: true,
          import: 'default',
        })
        return url['/assets/images/manga/' + this.mangaTitle + '/cover.jpg']
      },
      chapterLink(event) {
        navigateTo({ path: '/manga/' + this.mangaTitle + '/' + event.data.index })
      },
      formattedDate(date) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      }
    }
  }
</script>