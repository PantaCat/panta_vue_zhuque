import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons-vue'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const app = createApp(App)
const data = reactive({
    userName:'',
    passWord:''
});
router.beforeEach((to, from, next) => {
    if(to.fullPath === "/" || to.fullPath === "/login"){
        next(true);
    }
    const cookieuser = cookies.isKey("zhuqueloginuser");
    if(cookieuser){
        next(); // 已登录，继续
    }else{
        next("/login")// 未登录，跳转到登录页面
    }
})

app.use(ElementPlus, {
    size: 'small',
    zIndex: 3000,
    locale: zhCn
})
app.use(router)
Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})
setInterval(() => {
    const cookieuser = cookies.isKey("zhuqueloginuser");
    if(!cookieuser){
        router.push('/login');// 未登录，跳转到登录页面
    }
}, 1000)
app.mount('#app')