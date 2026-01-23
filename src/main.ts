import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons'
import { toElLine } from '@/utils'

const app = createApp(App)

for (let i in Icons) {
    app.component(`el-icon${toElLine(i)}`, (Icons as any)[i])
}

app.use(router).use(ElementPlus)

app.mount('#app')
