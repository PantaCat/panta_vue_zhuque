import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus, {
    size: 'small',
    zIndex: 3000,
    locale: zhCn
})
app.use(router)
Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})
app.mount('#app')