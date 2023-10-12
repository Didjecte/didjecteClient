<template>
  <div class="dark" @keydown="handleKeyDown" tabindex="0">
    <div class="dark:bg-neutral-800/95 bg-blue-100/70">
      <!-- header -->
      <div>
        <!-- other devices  -->
        <div class="h-20 max-md:hidden flex dark:bg-transparent bg-gradient-to-b from-blue-300 dark:from-black">
          <div class="flex mx-auto max-w-screen-xl w-full max-xl:px-8 max-sm:px-3">
            <div class="flex-initial flex justify-center items-center w-44 mr-12">
              <NuxtLink to="/">
                <img alt="logo" src="~/assets/images/logo.png" class="pt-auto" />
              </NuxtLink>
            </div>
            <div class="flex-auto">
              
            </div>
            <div class="flex-initial flex justify-right items-center">
              <!-- avatar component -->
              <Avatar label="D" size="large" style="background-color:#4a8c8f; color: #ffffff" class="border-none ml-0"/>
            </div>
          </div>
        </div>

        <!-- phone -->
        <div class="h-[60px] md:hidden dark:bg-transparent flex bg-gradient-to-b from-blue-300 dark:from-black mb-3">
          <div class="flex max-xl:px-8 max-sm:px-3 w-full items-center">
            <div class="flex-inital">
              <Sidebar 
                :showCloseIcon="false"
                v-model:visible="visible"
                :pt="{
                  mask: {
                    class: 'flex pointer-events-auto transition duration-200 z-20 transition-colors bg-black/40 dark'
                  },
                  root: ({ props }) => ({
                    class: [
                      'flex flex-col pointer-events-auto relative transition-transform',
                      'bg-white dark:bg-zinc-700 text-gray-700 border-0 shadow-lg',
                      {
                        '!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': props.position == 'full',
                        'h-full w-48': props.position == 'left' || props.position == 'right'
                      }
                    ]
                  }),
                  header: {
                    class: 'flex items-center justify-center p-5'
                  }
                }">
                <template #header>
                  <NuxtLink to="/">
                    <img alt="logo" src="~/assets/images/logo.png" class="pt-auto" />
                  </NuxtLink>
                </template>
                <template #default>
                  <div class="w-full">
                    <Menu 
                      :model="chapters"
                      :pt="{
                        root: {
                          class: 'py-1 dark:text-white/80'
                        },
                        action : ({ context, state }) => ({
                          class: [
                            'text-gray-700 dark:text-white/70 py-3 px-5 select-none', 
                            'cursor-pointer flex items-center no-underline overflow-hidden relative',
                            {
                              'text-blue-400 dark:text-white/100 dark:bg-zinc-800': context.item.route === this.$route.path
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
                          <span v-bind="props.label">Chapter {{ item.chapter }}</span>
                        </NuxtLink>
                      </template>
                    </Menu>
                  </div>
                </template>
              </Sidebar>
              <Button 
                icon="pi pi-book" 
                aria-label="ChaptersMenu"
                @click="visible = true" 
                :pt="{ 
                  root: {
                    class: 'items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom h-full transition duration-200 ease-in-out focus:outline-none focus:outline-offset-0 text-white bg-blue-500 dark:bg-blue-800 border border-blue-900 rounded-md px-4 py-3 text-base'
                  },
                  label: { 
                    style: 'width: 0' 
                    }
                  }"/>
            </div>
            <div class="flex-auto flex flex-wrap justify-left items-center px-2 truncate">
              <NuxtLink class="basis-full capitalize text-lg font-bold dark:text-white truncate" :to="'/manga/' + mangaTitle">{{ mangaTitle }}</NuxtLink>
              <div class="basis-full capitalize text-sm dark:text-white/70 truncate cursor-pointer" @click="visible = !visible">Chapter {{ chapterIndex }}</div>
            </div>
            <div class="flex-initial" >
              <!-- avatar component -->
              <Avatar label="D" size="large" style="background-color:#4a8c8f; color: #ffffff" class="border-none ml-0"/>
            </div>
          </div>
        </div>
      </div>
      
      <!-- add a dark mode -->
      <!-- content -->
      <div :class="['w-full',{ 'dark' : isDark}]">
        <Toast />
        <div class="w-full min-h-[100vh] max-w-screen-xl mx-auto max-xl:px-8 max-sm:px-3">
          <!-- paginator -->
          <div>
            <!-- other devices -->
            <div class="flex items-center justify-between max-md:hidden">
              <div class="flex-inital shrink">
                <Button
                  aria-label="Previous Chapter"
                  :label="prevButton"
                  @click="prevChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == 1 }"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
              <div class="flex shrink">
                <Button
                    icon="pi pi-angle-double-left" 
                    aria-label="Last Page"
                    @click="skipFirstPage()"
                    class="max-lg:hidden"
                    :pt="{
                      root: {
                        class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                      },
                      icon: {
                        class: 'text-sm'
                      },
                      label: {
                        class: 'hidden'
                      }
                    }"
                    />
                <Button 
                  icon="pi pi-angle-left" 
                  aria-label="Filter"
                  @click="changePage(pageIndex)"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'hidden'
                    }
                  }"
                  />
                <!-- Ipad -->
                <Paginator
                  class="max-md:hidden lg:hidden"
                  template="PageLinks"
                  :page-link-size="5"
                  :rows="1"
                  :totalRecords="chapter.pages"
                  :first="pageIndex"
                  @update:first="changePage($event + 1)"
                  :pt="{
                    root: {
                      class: ''
                    },
                    pageButton:  ({ context }) => ({
                      class: [
                      'relative select-none inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:border-blue-300 dark:text-white focus:outline-none focus:outline-offset-0 border-blue-50',
                        {
                          'pointer-events-none text-gray-950 bg-white/90 dark:bg-zinc-950 !border border-blue-200 dark:border dark:border-zinc-900/40' : context.active == true
                        }
                      ]
                    }),
                  }">
                </Paginator>
                
                <!-- PC -->
                <Paginator
                  class="max-lg:hidden"
                  template="PageLinks"
                  :page-link-size="7"
                  :rows="1"
                  :totalRecords="chapter.pages"
                  :first="pageIndex"
                  @update:first="changePage($event + 1)"
                  :pt="{
                    root: {
                      class: ''
                    },
                    pageButton:  ({ context }) => ({
                      class: [
                      'relative select-none inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:border-blue-300 dark:text-white focus:outline-none focus:outline-offset-0 border-blue-50 dark:hover:bg-zinc-900',
                        {
                          'pointer-events-none text-gray-950 bg-white/90 dark:bg-zinc-950 !border border-blue-200 dark:border dark:border-zinc-900/40' : context.active == true
                        }
                      ],
                    }),
                  }">
                </Paginator>
                <Button
                  icon="pi pi-angle-right" 
                  aria-label="Next Page"
                  @click="changePage(pageIndex + 2)"
                  :pt="{
                    root: {
                      class: 'p-ripple px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                    },
                    icon: {
                      class: 'text-sm'
                    },
                    label: {
                      class: 'hidden'
                    }
                  }"
                  />
                <Button
                  icon="pi pi-angle-double-right" 
                  aria-label="Last Page"
                  @click="skipLastPage()"
                  class="max-lg:hidden"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                    },
                    icon: {
                      class: 'text-sm'
                    },
                    label: {
                      class: 'hidden'
                    }
                  }"
                  />
                <Dropdown
                  :modelValue="pageNumber"
                  v-model="page" 
                  :options="pages" 
                  class="!w-[78px]"
                  scroll-height="400px"
                  @change="changePage($event.value)"
                  :pt="{
                    root: {
                      class: 'inline-flex relative cursor-pointer user-none bg-white/60 border rounded-md transition duration-200 h-12 mx-2 dark:bg-zinc-900 dark:border-zinc-900/40 border-blue-200 hover:border-blue-500'
                    }
                  }"/>
              </div>
              
              <div class="flex-inital shrink">
                <Button
                  aria-label="Next Chapter"
                  :label="nextButton"
                  @click="nextChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == lastChapterIndex }"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
            </div>
            <!-- phone -->
            <div class="flex items-center justify-between flex-wrap md:hidden">
              <div>
                <Button
                  aria-label="Previous Chapter"
                  :label="prevButtonPhone"
                  @click="prevChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == 1 }"
                  :pt="{
                    root: {
                      class: 'text-sm px-3 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
              <div class="flex items-center">
                <div>
                  <Button 
                    icon="pi pi-angle-left" 
                    aria-label="Filter"
                    @click="changePage(pageIndex)"
                    :pt="{
                      root: {
                        class: 'text-sm px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0'
                      },
                      label: {
                        class: 'hidden'
                      }
                    }"
                    />
                </div>
                <div>
                  <Dropdown
                    :modelValue="pageNumber"
                    v-model="page" 
                    :options="pages" 
                    class="!w-[40px] !h-[40px]"
                    input-class="text-sm !py-2 text-center flex justify-center"
                    scroll-height="400px"
                    @change="changePage($event.value)"
                    :pt="{
                      root: {
                        class: 'cursor-pointer user-none bg-white/60 border rounded-md transition duration-200 dark:bg-zinc-900 dark:border-zinc-900/40 border-blue-200 hover:border-blue-500'
                      },
                      trigger: {
                        class: 'hidden'
                      }
                    }"/>
                </div>
                <div>
                  <Button
                    icon="pi pi-angle-right" 
                    aria-label="Next Page"
                    @click="changePage(pageIndex + 2)"
                    :pt="{
                      root: {
                        class: 'text-sm px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 rounded-md transition duration-200 dark:text-white'
                      },
                      icon: {
                        class: 'text-sm'
                      },
                      label: {
                        class: 'hidden'
                      }
                    }"
                    />
                </div>
              </div>
              <div>
                <Button
                  aria-label="Next Chapter"
                  :label="nextButtonPhone"
                  @click="nextChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == lastChapterIndex }"
                  :pt="{
                    root: {
                      class: 'text-sm px-3 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
            </div>
          </div>
          <!-- image -->
          <div class="flex justify-center py-1 md:py-4">
            <img @click="changePage(parseInt(page)+1)" @contextmenu.prevent="changePage(parseInt(page)-1)" :src="mangaImage()" :alt="mangaTitle" class="md:w-5/6 lg:w-9/12 cursor-pointer"/>
          </div>
          
          <!-- paginator -->
          <div class="pb-16">
            <!-- other devices -->
            <div class="flex items-center justify-between max-md:hidden">
              <div class="flex-inital shrink">
                <Button
                  aria-label="Previous Chapter"
                  :label="prevButton"
                  @click="prevChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == 1 }"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
              <div class="flex shrink">
                <Button
                    icon="pi pi-angle-double-left" 
                    aria-label="Last Page"
                    @click="skipFirstPage()"
                    class="max-lg:hidden"
                    :pt="{
                      root: {
                        class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                      },
                      icon: {
                        class: 'text-sm'
                      },
                      label: {
                        class: 'hidden'
                      }
                    }"
                    />
                <Button 
                  icon="pi pi-angle-left" 
                  aria-label="Filter"
                  @click="changePage(pageIndex)"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'hidden'
                    }
                  }"
                  />
                <!-- Ipad -->
                <Paginator
                  class="max-md:hidden lg:hidden"
                  template="PageLinks"
                  :page-link-size="5"
                  :rows="1"
                  :totalRecords="chapter.pages"
                  :first="pageIndex"
                  @update:first="changePage($event + 1)"
                  :pt="{
                    root: {
                      class: ''
                    },
                    pageButton:  ({ context }) => ({
                      class: [
                      'relative select-none inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:border-blue-300 dark:text-white focus:outline-none focus:outline-offset-0 border-blue-50',
                        {
                          'pointer-events-none text-gray-950 bg-white/90 dark:bg-zinc-950 !border border-blue-200 dark:border dark:border-zinc-900/40' : context.active == true
                        }
                      ]
                    }),
                  }">
                </Paginator>
                
                <!-- PC -->
                <Paginator
                  class="max-lg:hidden"
                  template="PageLinks"
                  :page-link-size="7"
                  :rows="1"
                  :totalRecords="chapter.pages"
                  :first="pageIndex"
                  @update:first="changePage($event + 1)"
                  :pt="{
                    root: {
                      class: ''
                    },
                    pageButton:  ({ context }) => ({
                      class: [
                      'relative select-none inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:border-blue-300 dark:text-white focus:outline-none focus:outline-offset-0 border-blue-50 dark:hover:bg-zinc-900',
                        {
                          'pointer-events-none text-gray-950 bg-white/90 dark:bg-zinc-950 !border border-blue-200 dark:border dark:border-zinc-900/40' : context.active == true
                        }
                      ],
                    }),
                  }">
                </Paginator>
                <Button
                  icon="pi pi-angle-right" 
                  aria-label="Next Page"
                  @click="changePage(pageIndex + 2)"
                  :pt="{
                    root: {
                      class: 'p-ripple px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                    },
                    icon: {
                      class: 'text-sm'
                    },
                    label: {
                      class: 'hidden'
                    }
                  }"
                  />
                <Button
                  icon="pi pi-angle-double-right" 
                  aria-label="Last Page"
                  @click="skipLastPage()"
                  class="max-lg:hidden"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0 dark:hover:bg-black/90 dark:border-zinc-900/40'
                    },
                    icon: {
                      class: 'text-sm'
                    },
                    label: {
                      class: 'hidden'
                    }
                  }"
                  />
                <Dropdown
                  :modelValue="pageNumber"
                  v-model="page" 
                  :options="pages" 
                  class="!w-[78px]"
                  scroll-height="400px"
                  @change="changePage($event.value)"
                  :pt="{
                    root: {
                      class: 'inline-flex relative cursor-pointer user-none bg-white/60 border rounded-md transition duration-200 h-12 mx-2 dark:bg-zinc-900 dark:border-zinc-900/40 border-blue-200 hover:border-blue-500'
                    }
                  }"/>
              </div>
              <div class="flex-inital shrink">
                <Button
                  aria-label="Next Chapter"
                  :label="nextButton"
                  @click="nextChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == lastChapterIndex }"
                  :pt="{
                    root: {
                      class: 'px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
            </div>
            <!-- phone -->
            <div class="flex items-center justify-between flex-wrap md:hidden">
              <div>
                <Button
                  aria-label="Previous Chapter"
                  :label="prevButtonPhone"
                  @click="prevChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == 1 }"
                  :pt="{
                    root: {
                      class: 'text-sm px-3 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
              <div class="flex items-center">
                <div>
                  <Button 
                    icon="pi pi-angle-left" 
                    aria-label="Filter"
                    @click="changePage(pageIndex)"
                    :pt="{
                      root: {
                        class: 'text-sm px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 rounded-md transition duration-200 dark:text-white focus:outline-none focus:outline-offset-0'
                      },
                      label: {
                        class: 'hidden'
                      }
                    }"
                    />
                </div>
                <div>
                  <Dropdown
                    :modelValue="pageNumber"
                    v-model="page" 
                    :options="pages" 
                    class="!w-[40px] !h-[40px]"
                    input-class="text-sm !py-2 text-center flex justify-center"
                    scroll-height="400px"
                    @change="changePage($event.value)"
                    :pt="{
                      root: {
                        class: 'cursor-pointer user-none bg-white/60 border rounded-md transition duration-200 dark:bg-zinc-900 dark:border-zinc-900/40 border-blue-200 hover:border-blue-500'
                      },
                      trigger: {
                        class: 'hidden'
                      }
                    }"/>
                </div>
                <div>
                  <Button
                    icon="pi pi-angle-right" 
                    aria-label="Next Page"
                    @click="changePage(pageIndex + 2)"
                    :pt="{
                      root: {
                        class: 'text-sm px-4 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border-0 text-gray-500 rounded-md transition duration-200 dark:text-white'
                      },
                      icon: {
                        class: 'text-sm'
                      },
                      label: {
                        class: 'hidden'
                      }
                    }"
                    />
                </div>
              </div>
              <div>
                <Button
                  aria-label="Next Chapter"
                  :label="nextButtonPhone"
                  @click="nextChapter()"
                  v-ripple="false"
                  :class="{ 'invisible' : chapterIndex == lastChapterIndex }"
                  :pt="{
                    root: {
                      class: 'text-sm px-3 py-3 text-base relative inline-flex items-center justify-center user-none overflow-hidden leading-none border text-gray-500 rounded-md transition duration-200 dark:text-white transition duration-200 dark:hover:bg-black/90 dark:bg-black/30 dark:border-zinc-900/40'
                    },
                    label: {
                      class: 'flex-1 duration-200'
                    }
                  }"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: false,
  });
</script>

<script>
  export default {
    data () {
      return {
        visible: false,
        chapterIndex: 1,
        lastChapterIndex: 5,
        lastChapterpage: 12,
        onePage: true,
        chapter: {
          index: 3,
          date: '2021-10-10',
          pages: 12
        },
        page: 1,
        mangaTitle: '',
        isDark: false,
        pages: [],
        chapters: []
      }
    },
    computed: {
      pageIndex() {
        if (this.page) {
          return this.page - 1
        } else {
          return 0
        }
      },
      pageNumber() {
        if (this.page) {
          return this.page
        } else {
          return 0
        }
      },
      prevButtonPhone() {
        if (this.chapterIndex == 1) {
          return 'Back'
        } else {
          return 'Chp ' + (parseInt(this.chapterIndex) - 1)
        }
      },
      prevButton() {
        if (this.chapterIndex == 1) {
          return 'Back'
        } else {
          return 'Chapter ' + (parseInt(this.chapterIndex) - 1)
        }
      },
      nextButtonPhone() {
        if (this.chapterIndex == this.lastChapterIndex) {
          return 'End'
        } else {
          return 'Chp ' + (parseInt(this.chapterIndex) + 1)
        }
      },
      nextButton() {
        if (this.chapterIndex == this.lastChapterIndex) {
          return 'Finished'
        } else {
          return 'Chapter ' + (parseInt(this.chapterIndex) + 1)
        }
      }
    },
    created() {
      const route = useRoute()
      this.$primevue.config.ripple = false

      this.mangaTitle = route.params.name
      this.chapterIndex = route.params.chapter
      this.page = route.params.page
      this.pages = this.generateArray(this.chapter.pages)
      this.chapters = this.generateChapters(this.lastChapterIndex).reverse()
      if (process.browser) {
        window.addEventListener('keydown', this.onKeyPress)
      }
    },
    unmounted() {
      window.removeEventListener('keydown', this.onKeyPress)
    },
    methods: {
      mangaImage() {
        //works but be specific or it will load performance
        //maybe put in store and load it from there
        const url = import.meta.glob('~/assets/images/manga/**/*.jpg' , {
          eager: true,
          import: 'default',
        })
        return url['/assets/images/manga/' + this.mangaTitle + '/chp' + this.chapterIndex + '/chp' + this.chapterIndex + '_p' + this.page + '.jpg']
      },
      switchDark() {
        this.isDark = !this.isDark
        return
      },
      onKeyPress(event) { 
        // Check for left arrow key
        if (event.keyCode === 37) {
          this.changePage(parseInt(this.page)-1)
        }
        // Check for right arrow key
        else if (event.keyCode === 39) {
          this.changePage(parseInt(this.page)+1)
        }
      },
      changePage(index) {
        if(index == (this.chapter.pages + 1)) {
          if(this.chapterIndex == this.lastChapterIndex) {
            this.$toast.add({ severity: 'info', summary: 'Finished!', detail: 'Until next publication...', life: 3000 });
            return
          } else {
            return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + (parseInt(this.chapterIndex) + 1) + '/' + 1 })
            
          }
        }
        if(index == 0) {
          if(this.chapterIndex == 1) {
            return navigateTo({ path: '/manga/' + this.mangaTitle })
          } else {
            return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + (parseInt(this.chapterIndex) - 1) + '/' + this.lastChapterpage })
          }
        } 
        return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + this.chapterIndex + '/' + (index) })
      },
      skipLastPage() {
        if(this.page == (this.chapter.pages)) {
          if(this.chapterIndex == this.lastChapterIndex) {
            this.$toast.add({ severity: 'info', summary: 'Finished!', detail: 'Until next publication...', life: 3000 });
            return
          } else {
            return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + (parseInt(this.chapterIndex) + 1) + '/' + 1 })
          }
        } else {
          return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + this.chapterIndex + '/' + (this.chapter.pages) })
        }
      },
      skipFirstPage() {
        if(this.page == 1) {
          if(this.chapterIndex == 1) {
            return navigateTo({ path: '/manga/' + this.mangaTitle })
          } else {
            return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + (parseInt(this.chapterIndex) - 1) + '/' + this.lastChapterpage })
          }
        } else {
          return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + this.chapterIndex + '/' + 1 })
        }
      },
      prevChapter() {
        if(this.chapterIndex == 1) {
          return navigateTo({ path: '/manga/' + this.mangaTitle })
        } else {
          return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + (parseInt(this.chapterIndex) - 1) + '/1' })
        }
      },
      nextChapter() {
        if(this.chapterIndex == this.lastChapterIndex) {
          this.$toast.add({ severity: 'info', summary: 'Finished!', detail: 'Until next publication...', life: 3000 });
          return
        } else {
          return navigateTo({ path: '/manga/' + this.mangaTitle + '/' + (parseInt(this.chapterIndex) + 1) + '/' + 1 })
        }
      },
      generateArray(number) {
        const result = []

        for (let i = 1; i <= number; i++) {
          result.push(String(i))
        }

        return result
      },
      generateChapters(number) {
        const result = []

        for (let i = 1; i <= number; i++) {
          result.push({ chapter: String(i), route: '/manga/' + this.mangaTitle + '/' + i + '/1' })
        }
        console.log(result)
        return result
      }
    }
  }
</script>