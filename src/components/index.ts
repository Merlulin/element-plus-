import type { App } from "vue"
import Container from "./container/index"
import ChooseArea from "./chooseArea/index"
import ChooseIcon from "./chooseIcon/index"

const components = [Container, ChooseArea, ChooseIcon]

export default {
    install(app: App) {
        components.forEach((component) => {
            app.use(component)
        })
    }
}