import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";
import Button from "primevue/button";
import TabMenu from 'primevue/tabmenu';



export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: Tailwind, ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("TabMenu", TabMenu);
    //other components that you need
});