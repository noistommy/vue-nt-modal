<script setup>
import HelloWorld from './components/HelloWorld.vue'
import 'nt-cabinet-component'
import {ref, onMounted} from 'vue'



const theme = ref('system');

const selectTheme = (mode) => {
  const html = document.documentElement;
  theme.value = mode
  
  html.className = ''
  html.classList.add(`${mode}-mode`);
  
  sessionStorage.setItem('theme-mode', mode)
}

onMounted(() => {
  selectTheme(sessionStorage.getItem('theme-mode'))
})
</script>

<template>
  <NtTeleport />
  <header>
    <div class="menu-wrapper">
      <nav>
        <li>
          <div class="ga-buttons small">
            <div class="ga-button icon" :class="{selected: theme === 'light'}" @click="selectTheme('light')"><i class="xi-sun" /></div>
            <div class="ga-button icon" :class="{selected: theme === 'dark'}" @click="selectTheme('dark')"><i class="xi-moon" /></div>
            <div class="ga-button icon" :class="{selected: theme === 'system'}" @click="selectTheme('system')"><i class="xi-desktop" /></div>
          </div>
        </li>
        <li>
          <div class="ga-buttons small">
            <div class="ga-button icon">
              <i class="xi-github"></i>
              <a href="https://github.com/noistommy/vue-nt-modal.git" class="link" target="_blank"></a>
            </div>
            <div class="ga-button icon">
              <i class="xi-package"></i>
              <a href="https://www.npmjs.com/package/vue-nt-modal" class="link" target="_blank"></a>
            </div>

          </div>
        </li>
      </nav>
    </div>
    <div class="wrapper ga flex center p-10">
      <div class="greetings preview-modal">
        <div className="modal-header">
            <div className="title">NT Modal</div>
            <div className="close-btn">
            </div>
          </div>
          <div className="modal-contents">
            <div class="main-title">
              Nt Modal
            </div>
            <div class="sub-title">A simple and flexible modal component for 
              <span class="ga-tag label green">Vue</span>
            </div>
          </div>
          <div className="modal-footer be flex center">
            <div className="ga-button small">Let's start</div>
          </div>
      </div>
    </div>
  </header>
  <main>
    <HelloWorld msg="Nt Modal" />
  </main>
  <nt-cabinet module="vue-nt-modal" ></nt-cabinet>
</template>

<style scoped>
.menu-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    nav {
      display: flex;
      gap: 10px;
      li {
        list-style: none;
      }
    }
  }
.greetings {
  text-align:center;
}
header {
  margin-top: 100px;
  text-align: center;
}
main {
  margin-bottom: 100px;
}
.main-title {
  text-align: center;
  font-size: 3em;
  font-weight: 700;
}
.sub-title {
  margin-bottom: 10px;
}

</style>
