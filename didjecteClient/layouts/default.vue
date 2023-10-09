<template>
  <div>
    <TabMenu 
      :activeIndex="active" 
      :model="items"
      :pt="{
        root: {
          class: 'overflow-x-auto bg-blue-300'
        },
        menu: {
          class: 'container mx-auto bg-blue-300 flex p-0 list-none flex-nowrap border-solid border-gray-300 border-b-2 outline-none no-underline text-base list-none'
        }
      }"
      class="">
        <!-- other devices -->
        <div class="card flex justify-content-center">
          <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Sidebar>
          <Button icon="pi pi-arrow-right" @click="visible = true" />
        </div>
      <template #item="{ label, item, props }">

        <!-- phone only  -->
        <NuxtLink 
          v-ripple="{
            pt: {
              root: {
                class: 'block absolute bg-yellow-400 rounded-full pointer-events-none'
              }
            }
          }" 
          :to="item.route" 
          v-bind="props.action" 
          class="focus:!shadow-none !rounded-none !bg-blue-300 md:visible invisible">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ label }}</span>
        </NuxtLink>
      </template>
      
    </TabMenu>  

        <!-- other devices -->
        <div class="card flex justify-content-center">
          <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Sidebar>
          <Button icon="pi pi-arrow-right" @click="visible = true" />
        </div>
   <slot />
    <!-- <AppFooter /> -->
  </div>
</template>

<script>
  export default {  
    data () {
      return {
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
  @keyframes ripples {
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }
</style>