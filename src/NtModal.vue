<template>
  <transition name="fade">
    <div v-if="isVisible" class="nt-modal" :style="{ '--offset': `${(id % 5) * 20}px` }">
      <div class="nt-modal-background" @click="closeModalToClick" />
      <div class="nt-modal-container">
        <component :is="compContents" :modal-id="id" v-bind="props" @close="closeModal" />
      </div>
    </div>
  </transition>
</template>

<script>
import { shallowRef } from 'vue'
export default {
  name: 'NtModal',
  data() {
    return {
      isVisible: false,
      compContents: null
    }
  },
  props: {
    id: Number,
    comp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    options: Object,
    props: Object
  },
  mounted() {
    this.compContents = shallowRef(this.comp)
    this.$nextTick(() => (this.isVisible = this.compContents))
    // this.isVisible = this.compContents
    if (this.options.escapeToClose) {
      window.addEventListener('keydown', this.onEscapeKeyPress)
    }
  },
  unmounted() {
    if (this.options.escapeToClose) {
      window.removeEventListener('keydown', this.onEscapeKeyPress)
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.$ntModal.close(this.id)
    },
    onEscapeKeyPress(event) {
      const keyCode = event.keyCode || event.which
      if (keyCode === 27) {
        this.closeModal()
      }
    },
    closeModalToClick(e) {
      if (this.options.clickToClose && e.target.className.indexOf('background') > -1) {
        this.$ntModal.close(this.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 500ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
