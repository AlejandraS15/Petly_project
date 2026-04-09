// Corrección: Alejandra Suarez

import './assets/css/input.css';
import './assets/main.css';

// External imports
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Internal imports
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
