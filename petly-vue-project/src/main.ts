// Corrección: Alejandra Suarez

import './assets/css/input.css';
import './assets/main.css';

// External imports
import { createApp } from 'vue';

// Internal imports
import App from './App.vue';
import router from './router';
import PiniaConfig from './PiniaConfig.js'; 

const app = createApp(App);

app.use(PiniaConfig.init());
app.use(router);

app.mount('#app');
