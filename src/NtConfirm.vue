<template>
  <div class="nt-modal" :style="{ '--offset': `${(id % 5) * 20}px` }">
    <div class="nt-modal-background" />
    <div class="nt-modal-container">
      <div class="modal confirm">
        <div class="modal-header">
          <div class="title">{{ props.title }}</div>
          <div class="close-btn" @click="$emit('close')">
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

<script>
export default {
  name: 'NtConfirm',
  data() {
    return {
      isLoading: false
    }
  },
  props: {
    id: Number,
    options: Object,
    props: Object
  },
  computed: {
    getWidth() {
      return this.width + 'px'
    }
  },
  methods: {
    allClose() {
      this.props.result(this.props.params)
      this.$ntModal.closeAll()
    },
    closeModal() {
      this.$emit('close')
      this.$ntModal.close()
    }
  }
}
</script>

<style lang="scss"></style>
