<<<<<<< HEAD
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
=======
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
