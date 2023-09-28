<template>
  <div>
    <TabMenu v-model:activeIndex="active" :model="items">
      <template #item="{ label, item, props }">
        <NuxtLink v-if="item.route" v-slot="routerProps" :to="item.route" custom>
            <a :href="routerProps.href" v-bind="props.action" @click="($event) => routerProps.navigate($event)" @keydown.enter.space="($event) => routerProps.navigate($event)">
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </NuxtLink>
      </template>
    </TabMenu>
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        active : ref(0),
        items : ref([
          {
              label: 'Home',
              icon: 'pi pi-fw pi-home',
              route: '/'
          },
          {
              label: 'Calendar',
              icon: 'pi pi-fw pi-calendar',
              route: '/calendar'
          },
          {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              route: '/edit'
          },
          {
              label: 'Documentation',
              icon: 'pi pi-fw pi-file',
              route: '/documentation'
          },
          {
              label: 'Settings',
              icon: 'pi pi-fw pi-cog',
              route: '/settings'
          }
        ])
      }
    }
  }
</script>
