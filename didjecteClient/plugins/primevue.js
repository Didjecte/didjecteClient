import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";
import Button from "primevue/button";
import TabMenu from 'primevue/tabmenu';
import MegaMenu from 'primevue/megamenu';
import Sidebar from 'primevue/sidebar';
import Ripple from 'primevue/ripple';



export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: Tailwind, ripple: true });
    nuxtApp.vueApp.directive('ripple', Ripple);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("TabMenu", TabMenu);
    nuxtApp.vueApp.component("MegaMenu", MegaMenu);
    nuxtApp.vueApp.component("Sidebar", Sidebar);
    //other components that you need
});