<template>
  <div>
    <!-- other devices  -->
    <div class="max-md:hidden flex bg-blue-300">
      <div class="max-w-screen-xl mx-auto w-full flex max-xl:px-8 max-sm:px-3">
        <div class="flex-initial flex justify-center items-center w-44 mr-12">
          <NuxtLink to="/">
            <img alt="logo" src="~/assets/images/logo.png" class="pt-auto" />
          </NuxtLink>
        </div>
        <div class="flex-auto">
          <TabMenu 
            :activeIndex="active" 
            :model="items"
            :pt="{
              root: {
                class: 'overflow-x-auto overflow-hidden'
              },
              menu: {
                class: 'flex p-0 list-none flex-nowrap outline-none no-underline text-base list-none'
              },
              action: ({ context, state }) => ({
                class: [
                  'cursor-pointer select-none flex items-center relative no-underline overflow-hidden',
                  'p-5 font-bold rounded-t-lg ',
                  //'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                  {
                      'bg-white text-gray-700 dark:bg-gray-900 dark:text-white/80': state.d_activeIndex !== context.index, // Condition-based hover styles.
                      'bg-white text-blue-700 dark:bg-gray-900 dark:text-blue-300': state.d_activeIndex === context.index // Condition-based active styles.
                  }
                ],
                style: 'top:2px'
              })
            }"
            >
            <template #item="{ label, item, props }">
              <NuxtLink 
                v-ripple="{
                  pt: {
                    root: {
                      class: 'block absolute bg-blue-300 rounded-full pointer-events-none'
                    }
                  }
                }" 
                :to="item.route" 
                v-bind="props.action" 
                class="test focus:!shadow-none !rounded-none !top-0 !bg-blue-300">
                <span v-bind="props.icon" />
                <span v-bind="props.label">{{ label }}</span>
              </NuxtLink>
            </template>
          </TabMenu>  
        </div>
        <div class="flex-initial flex justify-right items-center">
          <!-- avatar component -->
          <Avatar label="D" size="large" style="background-color:#4a8c8f; color: #ffffff" class="border-none ml-0"/>
        </div>
      </div>
    </div>

    <!-- phone -->
    <MegaMenu orientation="horizontal" class="rounded-none md:hidden flex !bg-blue-300 max-xl:px-8 max-sm:px-3" :pt="{ start: { class: 'w-full' }}">
      <template #start>
        <div class="flex">
          <div>
            <Sidebar 
              :showCloseIcon="false"
              v-model:visible="visible"
              :pt="{
                root: ({ props }) => ({
                  class: [
                    'flex flex-col pointer-events-auto relative transition-transform',
                    'bg-white text-gray-700 border-0 shadow-lg',
                    {
                      '!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': props.position == 'full',
                      'h-full w-64': props.position == 'left' || props.position == 'right'
                    },
                    'dark:border dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80'
                  ]
                }),
                header: {
                  class: 'flex items-center justify-center p-5'
                }
              }">
              <template #header>
                <div>
                  <NuxtLink to="/" @click="visible=!visible">
                    <img alt="logo" src="~/assets/images/logo.png" class="mx-auto"/>
                  </NuxtLink>
                </div>
              </template>
              <template #default>
                <div class="w-full">
                  <Menu 
                    :model="items"
                    :pt="{
                      root: {
                        class: 'py-1 bg-white dark:bg-gray-900 dark:text-white/80'
                      },
                      action : ({ context, state }) => ({
                        class: [
                          'text-gray-700 dark:text-white/80 py-3 px-5 select-none', 
                          'cursor-pointer flex items-center no-underline overflow-hidden relative',
                          {
                            '!text-blue-500': context.item.route === this.$route.path
                          }
                        ]
                      }),
                      icon : ({ context, state }) => ({
                        class: [
                          'dark:text-white/70 mr-2'
                        ]
                      }),
                    }" 
                    class="!w-full">
                    <template #item="{ item, label, props }">
                      <NuxtLink 
                        :to="item.route" 
                        v-bind="props.action" 
                        @click="visible = false">
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ label }}</span>
                      </NuxtLink>
                    </template>
                  </Menu>
                </div>
              </template>
            </Sidebar>
            <Button icon="pi pi-bars" aria-label="Menu" @click="visible = true" :pt="{ label: { style: 'width: 0' }}"/>
          </div>
          <div class="flex-auto flex justify-center items-center px-2">
            <NuxtLink to="/">
              <img alt="logo" src="~/assets/images/logo.png" class="pt-auto h-[50px]" />
            </NuxtLink>
          </div>
          <div class="flex-initial" >
            <!-- avatar component -->
            <Avatar label="D" size="large" style="background-color:#4a8c8f; color: #ffffff" class="border-none ml-0"/>
          </div>
        </div>
      </template>
    </MegaMenu>
    <slot />
  </div>
</template>

<script>
  export default {  
    data () {
      return {
        path : this.$route.path,
        visible: false,
        active : ref(0),
        items : ref([
          {
              label: 'Manga',
              icon: 'pi pi-fw pi-book',
              route: '/manga'
          },
          {
              label: 'Video',
              icon: 'pi pi-fw pi-youtube',
              route: '/video'
          },
          {
              label: 'Guide',
              icon: 'pi pi-fw pi-book',
              route: '/guide'
          }
        ])
      }
    }
  }
</script>

<style scoped>
  span[data-p-ink-active="true"]{
    animation: ripples 1s linear !important;
  }

  .ripple:focus {
    position: absolute;
    display: block;
    border-radius: 50%;
    animation: ripples 1s linear !important;
  }
  
  @keyframes ripples {
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }
  
  .test:before {
    content: "";
    height: 2px;
    width: 0%;
    background: rgba(59 ,130 ,246, 1);
    display: block;
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .test:hover:before {
    width: 50%;
  }
</style>