<script setup>
import { ref, reactive, getCurrentInstance, inject, watch } from 'vue'
import TestModal from './TestModal.vue'
import WelcomeItem from './WelcomeItem.vue'

defineProps({
  msg: String,
})

const ntModal = inject('$ntModal')
const count = ref(0)

const stack = ref(false)

// const { proxy } = getCurrentInstance()
// const ntModal = proxy.$ntModal
const modalOption = reactive({
  useStack: stack.value,
  clickToClose: false,
  escapeToClose: false
})

const modalProps = reactive({
  title: '모달 타이틀',
  description: '모달 테스트 입니다.',
  pText: '확인',
  nText: '취소',
  useHeader: true,
  useNew: true,
  useStack: stack.value
})

watch(stack, (newValue) => {
  modalOption.useStack = newValue
  modalProps.useStack = newValue
})

// const title = '모달'
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
// const toggleOption = (type) => {
//   if(type === 'x') {
//     modalOption.clickToClose = !modalOption.clickToClose
//   } else {
//     modalOption.escapeToClose = !modalOption.escapeToClose
//   }
// }
const selectedMode = ref('modal');

const selectedShow = () => {
  if (selectedMode.value === 'modal') {
    showModal()
  } else {
    showConfirm()
  }
}

</script>

<template>
  <div class="ga-segment align-center">
    <button class="ga-button green" type="button" @click="showModal">Show Modal</button>
    <button class="ga-button yellow" type="button" @click="showConfirm">Show Confirm</button>
  </div>

  <WelcomeItem>
    <template #icon>
      <i class="xi-layout-o"></i>
    </template>
    <template #heading>Base
      <p><code>Modal</code> 과 <code>Confirm</code>의 구분은 show()의 param 중 comp에 의해 결정됩니다. 'confirm'으로 설정 시 지정된 confirm template이 나타나고 사용자 컴포넌트로 설정 시 해당 컴포넌트가 동적으로 적용 됩니다. </p>
      <p>confirm 실행 시 컴펌 제목, 내용, 확인, 취소 버튼 텍스트를 지정 할 수 있습니다.</p>
    </template>
    <div class="ga-segment border">
      <div class="contents">
        <div class="ga-buttons small">
          <button class="ga-button" :class="{selected: selectedMode === 'modal'}" @click="selectedMode = 'modal'">Modal</button>
          <button class="ga-button"  :class="{selected: selectedMode === 'confirm'}" @click="selectedMode = 'confirm'">Confirm</button>
        </div>
      </div>
      <div class="ga-form">
        <div class="header">
          <div class="title h5">직접 모달 타이틀과 설명을 입력해보세요.</div>
        </div>
        <div class="fields">
          <div class="ga-input">
            <input type="text" placeholder="title" v-model="modalProps.title">
          </div>
          <div class="ga-input">
            <input type="text" placeholder="description" v-model="modalProps.description">
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="ga-button" @click="selectedShow">Show {{selectedMode}}</button>
      </div>
    </div>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <i class="xi-browser"></i>
    </template>
    <template #heading>
      Header
      <p>기본 modal-header를 제공합니다. 적용 시 title과 닫기 버튼이 표시 됩니다. 사용 하기 위해 컴포넌트 내부에 <code> slot: header </code> 를 포함해야 합니다.  </p>
    </template>
    <div class="ga-segment border">
      <div class="check-set">
        <label class="ga-switch slide inside round">
          <input type="checkbox" v-model="modalProps.useHeader"  :checked="modalProps.useHeader">
          <span class="switch round"></span>
        </label>
        <div class="label">{{modalProps.useHeader ? 'Use' : 'No use'}} modal header option (with close button)</div>
      </div>
      <div class="contents">
        <button class="ga-button" @click="showModal">Show</button>
      </div>
    </div>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <i class="xi-library-add"></i>
    </template>
    <template #heading>
      Stack (Nested Modal)
      <p><code>useStack: true</code> 시 이중 모달을 허용합니다. 모달 내부에서 다른 모달을 호출 할 수 있습니다. 허용 하지 않을 경우 마지막에 실행한 모달만 표시됩니다. </p>
    </template>
    <div class="ga-segment border">
      <div class="check-set">
        <label class="ga-switch slide inside round">
          <input type="checkbox" v-model="stack"  :checked="stack">
          <span class="switch round"></span>
        </label>
        <div class="label">{{stack ? 'Allow' : 'No allow'}} nested modal</div>
      </div>
      <div class="contents">
        <button class="ga-button" @click="showModal">Show</button>
      </div>
    </div>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <i class="xi-close-square-o"></i>
    </template>
    <template #heading>
      Click to close
      <p>모달 영역 밖(dimmed 영역)을 클릭하여 창을 닫을 수 있도록 설정합니다.</p>
    </template>
    <div class="ga-segment border">
      <div class="check-set">
        <label class="ga-switch slide inside round">
          <input type="checkbox" v-model="modalOption.clickToClose"  :checked="modalOption.clickToClose">
          <span class="switch round"></span>
        </label>
        <div class="label">{{modalOption.clickToClose ? 'Use' : 'No use'}} 'Click to close'</div>
      </div>
      <div class="contents">
        <button class="ga-button" @click="showModal">Show</button>
      </div>
    </div>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <i class="xi-close-square-o"></i>
    </template>
    <template #heading>
      Press ESC to close
      <p><span class="ga-tag kbd esc">ESC</span>로 창을 닫을 수 있도록 설정합니다.</p>
    </template>
    <div class="ga-segment border">
      <div class="check-set">
        <label class="ga-switch slide inside round">
          <input type="checkbox" v-model="modalOption.escapeToClose"  :checked="modalOption.escapeToClose">
          <span class="switch round"></span>
        </label>
        <div class="label">{{modalOption.escapeToClose ? 'Use' : 'No use'}} 'Press ESC to close'</div>
      </div>
      <div class="contents">
        <button class="ga-button" @click="showModal">Show</button>
      </div>
    </div>
  </WelcomeItem>
  

</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.check-set {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
