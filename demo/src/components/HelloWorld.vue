<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import TestModal from './TestModal.vue'

defineProps({
  msg: String,
})

const count = ref(0)

const { proxy } = getCurrentInstance()
const ntModal = proxy.$ntModal

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

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="showModal">Show Modal</button>
    <button type="button" @click="showConfirm">Show Confirm</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
