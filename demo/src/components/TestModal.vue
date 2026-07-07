<template>
  <div class="modal">
    <template v-if="useHeader">
      <slot name="header"></slot>
    </template>
    <div class="modal-contents">
      <div class="contents">
        <template v-if="!useHeader">
          <div class="h3 title">{{ title }}</div>
          <div class="close-btn" @click="$emit('close')">
            <i class="xi-close"></i>
          </div>
        </template>
        <div>{{ description }}</div>
      </div>
    </div>
    <div class="modal-footer">
      <div v-if="useStack" class="btn-set add">
        <button class="ga-button" @click="addModal">New</button>
      </div>
<!--      <button class="ga-button green" @click="returnTest('테스트')">테스트</button>-->
      <div class="btn-set">
        <button class="ga-button text" @click="$emit('close')">{{ nText }}</button>
        <button class="ga-button primary" @click="addConfirm">{{ pText }}</button>
      </div>
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

const props = defineProps({
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
    default: 'Action'
  },
  nText: {
    type: String,
    default: 'Cancel'
  },
  useHeader: Boolean,
  useNew: Boolean,
  useStack: Boolean
})

watch(resultConfirm.value, () => {
  this.returnTest(resultConfirm.value)
})

const LOREM = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur ea mollitia cupiditate accusantium earum nulla. Temporibus, expedita. Facere, consectetur. Amet iure perferendis vel ipsum, animi dolorum et ratione repellat?'


const addModal = () => {
  const modalProps = {
    title: '모달 테스트',
    description: LOREM,
    pText: '저장',
    useHeader: true,
    useNew: false,
    useStack: props.useStack
  }
  ntModal.show({
    comp: TestModal,
    props: modalProps,
    options: {
      useStack: props.useStack
    }
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
  background-color: var(--bgc);
  color: var(--txt);
  .modal-contents {
    position: relative;
    max-height: 500px;
    overflow-y: auto;
    .title {
      margin-bottom: 1rem;
    }
    .close-btn {
      position: absolute;
      padding: 20px;
      top: 0;
      right: 0;
    }
  }
  .modal-footer {
    display: flex;
    justify-content: end;
    .btn-set.add {
      flex-grow: 1;
    }
  }
}
</style>
