import NtTeleport from './NtTeleport.vue'
import mitt from 'mitt'
const defaultModalOptions = {
  useStack: false,
  clickToClose: false,
  escapeToClose: false
}
let extendOptions = {}
const setOption = modalOption => {
  return { ...defaultModalOptions, ...modalOption }
}

const init = () => {
  const emitter = mitt()
  const show = ({ comp, props, options, handler }) => {
    emitter.emit('show-modal', { comp, props, options, handler })
  }
  const close = modalId => {
    emitter.emit('close-modal', modalId)
  }
  const closeAll = () => {
    emitter.emit('close-all-modal')
  }
  return { show, close, closeAll, emitter }
}

export default {
  install(app, options = {}) {
    app.config.globalProperties.$ntModal = init()
    extendOptions = setOption(options)
    const extendComp = { extends: NtTeleport, props: { options: { type: Object, default: () => extendOptions } } }
    app.component('NtTeleport', extendComp)
  }
}
