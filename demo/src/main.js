import { createApp } from 'vue'
import './style.css'
import './frogui.css'
import App from './App.vue'

const app = createApp(App)

import NtModal from '../../src'
import '../../src/nt-modal.scss'

app.use(NtModal, {
    clickToClose: true,
    escapeToClose: true
})

app.mount('#app')
