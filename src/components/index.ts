import type { App } from "vue"
import Container from "./container/index"
import ChooseArea from "./chooseArea/index"
import ChooseIcon from "./chooseIcon/index"
import Notification from "./notification/index"
import List from "./list/index"
import Menu from "./menu/index"

const components = [Container, ChooseArea, ChooseIcon, Notification, List, Menu]

export default {
    install(app: App) {
        components.forEach((component) => {
            app.use(component)
        })
    }
}