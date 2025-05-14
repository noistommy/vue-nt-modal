<template>
  <div class="modal">
    <div class="modal-header">
      <div class="title">{{ title }} ({{ modalId }})</div>
      <div class="close-btn" @click="$emit('close')">
       <i class="fa fa-xmark"></i>
      </div>
    </div>
    <div class="modal-contents">
      <div class="contents">
        <div>{{ description }}</div>
      </div>
    </div>
    <div class="modal-footer align-right">
      <button class="ga-button secondary" @click="addModal">생성</button>
<!--      <button class="ga-button green" @click="returnTest('테스트')">테스트</button>-->
      <button class="ga-button primary" @click="addConfirm">{{ pText }}</button>
      <button class="ga-button secondary outline" @click="$emit('close')">{{ nText }}</button>
    </div>
  </div>
</template>

<script setup>
import TestModal from './TestModal.vue'
import { ref, inject, watch } from 'vue'


const ntModal = inject('$ntModal')

defineOptions({
  name: 'TestModal'
})

const resultConfirm = ref(null)

defineProps({
  modalId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '본문 작성'
  },
  pText: {
    type: String,
    default: '확인'
  },
  nText: {
    type: String,
    default: '취소'
  }
})

watch(resultConfirm.value, () => {
  this.returnTest(resultConfirm.value)
})

const addModal = () => {
  const modalProps = {
    title: '모달 테스트',
    description: '모달 테스트 입니다.',
    pText: '저장'
  }
  ntModal.show({
    comp: TestModal,
    props: modalProps,
    options: {}
  })
}
const addConfirm = () => {
  const modalProps = {
    title: '확인',
    description: '모달 컴펌 테스트 입니까?',
    pText: '확인',
    result: data => {
      this.returnTest(data)
    }
  }
  ntModal.show({
    comp: 'confirm',
    props: modalProps,
    options: {}
  })
}

const returnTest = (data) => {
  this.$attrs.testFunc(data)
}
</script>

<style lang="scss" scoped>
.modal {
  width: 500px;
}
</style>
