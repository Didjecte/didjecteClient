<template>
  <div class="max-w-screen-xl mx-auto w-full mx-auto flex pt-5 max-xl:px-8 max-sm:px-4">
    <Carousel 
      :value="images" 
      :autoPlay="true"
      circular
      :autoplayInterval="8000"
      :pt="{
        root: {
          class: 'flex flex-col w-full h-[400px]'
        },
        container: {
          class: 'h-[700px] flex relative'
        },
        itemsContainer: {
          class: 'flex flex-row h-full w-full'
        },
        item: {
          class: 'flex shrink-0 grow justify-center h-full w-full'
        },
        itemCloned: {
          class: 'flex shrink-0 grow w-full justify-center'
        },
        previousButton: {
          class: 'z-10 !absolute left-2 sm:left-10 p-carousel-next p-link rounded-full hover:bg-black/40 bg-black/30 transition h-8 w-8 sm:h-[44px] sm:w-[44px] self-center'
        }, 
        nextButton: {
          class: 'z-10 !absolute right-2 sm:right-10 p-carousel-next p-link rounded-full hover:bg-black/40 bg-black/30 transition h-8 w-8 sm:h-[44px] sm:w-[44px] self-center'
        }
      }">
      <template #item="slotProps">
        <NuxtLink :to="slotProps.data.route" class="flex justify-end w-full h-full bg-cover bg-center" :style="{ backgroundImage: `url(`+ slotProps.data.src +`)`}">
          <Message 
            v-if="slotProps.data.info || slotProps.data.info !== ''"
            :closable="false"
            :pt="{
              root: {
                class: 'my-2 sm:my-4 rounded-md bg-blue-100/80 border-solid border-0 border-l-4 border-blue-500 text-blue-700 self-end'
              },
              wrapper: {
                class: 'flex items-center py-2 px-4 sm:py-5 sm:px-7'
              }
            }"
            >
            <span>{{ slotProps.data.info }}</span>
            <template #messageicon>
              <img src="~/assets/images/tip.png" class="w-5 h-5 mr-3" alt="info">
            </template>
          </Message>
        </NuxtLink>
      </template>
      <template #previousicon>
        <span class="pi pi-chevron-left text-xs sm:text-lg max-sm:mb-[7px] sm:mt-[5px] text-white"></span>
      </template>
      <template #nexticon>
        <span class="pi pi-chevron-right text-xs sm:text-lg max-sm:mb-[7px] sm:mt-[5px] text-white"></span>
      </template>
    </Carousel>
  </div>
</template>

<script>
  export default {
    data () {
      return {  
        images: [
          {
            src: '@/images/manga/didjecte/cover.jpg',
            alt: 'cover 1'
          }, {
            src: '~images/wallpaper_1.jpg',
            alt: 'cover 2'	
          }
        ],
        responsivesOptions: [
          {
              breakpoint: '991px',
              numVisible: 4
          },
          {
              breakpoint: '767px',
              numVisible: 3
          },
          {
              breakpoint: '575px',
              numVisible: 1
          }
        ],
        imagesUrl: []
      }
    },
    created () {
      this.imagesUrl = import.meta.glob('~/assets/images/**', {
        eager: true,
        import: 'default',
      })
      //make it dynamic with server data
      this.images = [
        {
          src: this.imagesUrl['/assets/images/wallpaper_1.png'],
          route: '/',
          info: 'Nouveau nouveau site est arrivé !',
          alt: 'cover 2'	
        },
        {
          src: this.imagesUrl['/assets/images/manga/didjecte/cover.jpg'],
          route: '/manga/didjecte/2/1',
          info: 'Chapitre 2 est disponible !',
          alt: 'cover 1'
        }
      ]
    },
    methods: {
    }
  }
</script>