// import { createApp } from 'vue'
import { createApp } from './domRenderer.js'
// import { createApp } from './canvasRenderer.js'
// import { createApp } from './threeRenderer.js'  
// import { createApp } from './pixiRenderer.js'
// import App from './App.vue'
import App from './domApp.vue'
// import App from './canvasApp.vue'
// import App from './threeApp.vue'
// import App from './pixiApp.vue'

createApp(App).mount('#app') 
