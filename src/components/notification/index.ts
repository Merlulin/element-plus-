import Notification from './src/index.vue'
import type { App } from 'vue'

export default {
    install(app: App) {
        app.component('m-notification', Notification)
    }   
}