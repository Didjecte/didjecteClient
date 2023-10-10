import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";

import Avatar from 'primevue/avatar';
import Button from "primevue/button";
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Image from 'primevue/image';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Ripple from 'primevue/ripple';
import Skeleton from "primevue/skeleton";
import Sidebar from 'primevue/sidebar';
import TabMenu from 'primevue/tabmenu';



export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: Tailwind, ripple: true });
    nuxtApp.vueApp.directive('ripple', Ripple);

    nuxtApp.vueApp.component("Avatar", Avatar);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Card", Card);
    nuxtApp.vueApp.component("Chip", Chip);
    nuxtApp.vueApp.component("Image", Image);
    nuxtApp.vueApp.component("Menu", Menu);
    nuxtApp.vueApp.component("MegaMenu", MegaMenu);
    nuxtApp.vueApp.component("Sidebar", Sidebar);
    nuxtApp.vueApp.component("Skeleton", Skeleton);
    nuxtApp.vueApp.component("TabMenu", TabMenu);
    //other components that you need
});