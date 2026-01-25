import type { App } from "vue"
import Container from "./src/index.vue"

export default {
    install(app: App) {
        app.component("m-container", Container)
    }
}