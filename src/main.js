import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(Quasar, quasarUserOptions).use(pinia).use(router).mount("#app");
