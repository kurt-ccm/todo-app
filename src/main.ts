import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

import BaseButton from './components/BaseButton.vue';
import BaseCard from './components/BaseCard.vue';

const app = createApp(App);
app.use(router);
app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)

app.mount('#app')
