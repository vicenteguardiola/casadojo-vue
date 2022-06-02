import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
//import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

loadFonts()


const app = createApp(App);

const vuetify = createVuetify({
   components,
   directives,
 })

app.use(router);


  
 app.use(vuetify);
  
app.mount('#app');
