import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";

import Avatar from 'primevue/avatar';
import Button from "primevue/button";
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import Dropdown from "primevue/dropdown";
import Image from 'primevue/image';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Paginator from "primevue/paginator";
import Panel from 'primevue/panel';
import Ripple from 'primevue/ripple';
import ScrollTop from 'primevue/scrolltop';
import Sidebar from 'primevue/sidebar';
import Skeleton from "primevue/skeleton";
import TabMenu from 'primevue/tabmenu';
import Toast from 'primevue/toast';
import Tooltip from 'primevue/tooltip';
import ToggleButton from "primevue/togglebutton";
import ToastService from 'primevue/toastservice';



export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: Tailwind, ripple: true });
    nuxtApp.vueApp.use(ToastService);
    
    nuxtApp.vueApp.directive('ripple', Ripple);
    nuxtApp.vueApp.directive('tooltip', Tooltip);

    nuxtApp.vueApp.component("Avatar", Avatar);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Card", Card);
    nuxtApp.vueApp.component("Chip", Chip);
    nuxtApp.vueApp.component("Column", Column);
    nuxtApp.vueApp.component("DataTable", DataTable);
    nuxtApp.vueApp.component("Divider", Divider);
    nuxtApp.vueApp.component("Dropdown", Dropdown);
    nuxtApp.vueApp.component("Image", Image);
    nuxtApp.vueApp.component("Menu", Menu);
    nuxtApp.vueApp.component("MegaMenu", MegaMenu);
    nuxtApp.vueApp.component("Paginator", Paginator);
    nuxtApp.vueApp.component("Panel", Panel);
    nuxtApp.vueApp.component("ScrollTop", ScrollTop);
    nuxtApp.vueApp.component("Sidebar", Sidebar);
    nuxtApp.vueApp.component("Skeleton", Skeleton);
    nuxtApp.vueApp.component("TabMenu", TabMenu);
    nuxtApp.vueApp.component("Toast", Toast);
    nuxtApp.vueApp.component("ToggleButton", ToggleButton);
    
    
    return {
        provide: {
            toast: nuxtApp.vueApp.config.globalProperties.$toast
        }
    }
    //other components that you need

});