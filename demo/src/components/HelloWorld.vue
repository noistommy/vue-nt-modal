<script setup>
import { ref, reactive, getCurrentInstance, inject } from 'vue'
import TestModal from './TestModal.vue'

defineProps({
  msg: String,
})

const ntModal = inject('$ntModal')
const count = ref(0)

// const { proxy } = getCurrentInstance()
// const ntModal = proxy.$ntModal

const modalProps = {
  title: '모달 테스트',
  description: '모달 테스트 입니다.',
  pText: '저장'
}
const modalOption = reactive({
  clickToClose: false,
  escapeToClose: false
})

const title = '모달'
function showModal() {
  ntModal.show({
    comp: TestModal,
    props: modalProps,
    options: modalOption
  })
}
function showConfirm() {
  ntModal.show({
    comp: 'confirm',
    props: modalProps,
    options: modalOption
  })
}
const toggleOption = (type) => {
  if(type === 'x') {
    modalOption.clickToClose = !modalOption.clickToClose
  } else {
    modalOption.escapeToClose = !modalOption.escapeToClose
  }
}

</script>

<template>
  <h1 class="header">{{ msg }}</h1>
  <h5 class="header title bold">설정</h5>
    <div class="ga-list">
      <div class="item ga-message" @click="toggleOption('x')">
        <div class="item-title">
          Use 'Click to close'
          <div class="sub-title">>> 클릭으로 닫기</div>
        </div>
        <div class="btn-set">
          <template v-if="modalOption.clickToClose">
            <div class="ga-tag label primary">사용</div>
          </template>
          <template v-else>
            <div class="ga-tag label secondary">사용안함</div>
          </template>
        </div>
      </div>
      <div class="item ga-message" @click="toggleOption('esc')">
        <div class="item-title">
          Use 'Press Escape Button to Close''
          <div class="sub-title">>> ESC 버튼을 사용하여 닫기</div>
        </div>
        <div class="btn-set">
          <template v-if="modalOption.escapeToClose">
            <div class="ga-tag label primary">사용</div>
          </template>
          <template v-else>
            <div class="ga-tag label secondary">사용안함</div>
          </template>
        </div>
      </div>
    </div>
  <div class="card">
    <button class="ga-button primary" type="button" @click="showModal">Show Modal</button>
    <button class="ga-button importance" type="button" @click="showConfirm">Show Confirm</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
