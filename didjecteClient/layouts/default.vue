<template>
  <div>
    <!-- other devices  -->
    <div class="max-md:hidden flex bg-blue-300">
      <div class="max-w-screen-xl mx-auto w-full mx-auto flex ">
        <div class="flex-initial flex justify-center items-center px-2">
          <img alt="logo" src="https://primefaces.org/cdn/primevue/images/primevue-logo-dark.svg" height="24" class="pt-auto" />
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
                  'border-b-2 p-5 font-bold rounded-t-lg ',
                  //'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                  {
                      'border-gray-300 bg-white text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-600 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 dark:hover:bg-gray-800/80': state.d_activeIndex !== context.index, // Condition-based hover styles.
                      'bg-white border-blue-500 text-blue-700 dark:bg-gray-900 dark:border-blue-300 dark:text-blue-300': state.d_activeIndex === context.index // Condition-based active styles.
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
                class="focus:!shadow-none !rounded-none !top-0 !bg-blue-300 transition ease-in-out hover:scale-110 hover:!bg-blue-400 duration-200">
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
    <MegaMenu orientation="horizontal" class="rounded-none md:hidden flex !bg-blue-300" :pt="{ start: { class: 'w-full' }}">
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
                  <img alt="logo" src="https://primefaces.org/cdn/primevue/images/primevue-logo-dark.svg" height="24" class="mx-auto"/>
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
                          'cursor-pointer flex items-center no-underline overflow-hidden relative'
                        ]
                      }),
                      icon : ({ context, state }) => ({
                        class: [
                          'pi pi-fw pi-youtube dark:text-white/70 mr-2',
                          {
                            'text-blue-700': context.item.route === this.$route.path
                          }
                        ]
                      }),
                    }" 
                    class="!w-full">
                    <template #item="{ item, label, props }">
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
                        @click="visible = false"
                        active-class="!text-blue-500">
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
            <img alt="logo" src="https://primefaces.org/cdn/primevue/images/primevue-logo-dark.svg" height="24" class="pt-auto" />
          </div>
          <div class="flex-initial" >
            <!-- avatar component -->
            <Avatar label="D" size="large" style="background-color:#4a8c8f; color: #ffffff" class="border-none ml-0"/>
          </div>
        </div>
      </template>
    </MegaMenu>
   <slot />
    <!-- <AppFooter /> -->
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
              label: 'Home',
              icon: 'pi pi-fw pi-home',
              route: '/'
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
  
</style>