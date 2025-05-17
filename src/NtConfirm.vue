<template>
  <div class="nt-modal" :style="{ '--offset': `${(id % 5) * 20}px` }">
    <div class="nt-modal-background" />
    <div class="nt-modal-container">
      <div class="modal confirm">
        <div class="modal-header">
          <div class="title">{{ props.title }}</div>
          <div class="close-btn" @click="closeModal">
            <i class="fa fa-xmark"></i>
          </div>
        </div>
        <div class="modal-contents">
          <div class="contents">
            <div>{{ props.description }}</div>
          </div>
        </div>
        <div class="modal-footer align-right">
          <button class="nt-button primary" @click="allClose">확인</button>
          <button class="nt-button secondary outline" @click="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, inject } from 'vue'

const modal = inject('$ntModal')
const emit = defineEmits(['close'])
defineProps({
  id: Number,
  options: Object,
  props: Object
})

// const isLoading = ref(false)

const allClose = () => {
  // props.result(props.params)
  modal.closeAll()
}
const closeModal = () => {
  emit('close')
  modal.close()
}

</script>
<style lang="scss"></style>
