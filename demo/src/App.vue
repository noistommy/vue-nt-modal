<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'


const theme = ref('system');

const selectTheme = (mode) => {
  const html = document.documentElement;
  theme.value = mode
  
  html.className = ''
  html.classList.add(`${mode}-mode`);
  
  sessionStorage.setItem('theme-mode', mode)
}
</script>

<template>
  <NtTeleport />
  <header>
    <div class="menu-wrapper">
      <nav>
        <li>
          <div class="ga-buttons round">
            <div class="ga-button icon" :class="{selected: theme === 'light'}" @click="selectTheme('light')"><i class="xi-sun" /></div>
            <div class="ga-button icon" :class="{selected: theme === 'dark'}" @click="selectTheme('dark')"><i class="xi-moon" /></div>
            <div class="ga-button icon" :class="{selected: theme === 'system'}" @click="selectTheme('system')"><i class="xi-desktop" /></div>
          </div>
        </li>
        <li>
          <div class="ga-button icon">
            <i class="xi-github"></i>
            <a href="https://github.com/noistommy/vue-nt-modal.git" class="link" target="_blank"></a>
          </div>
        </li>
      </nav>
    </div>
    <div class="wrapper">
      <div class="greetings">
        <div class="main-title">
          Nt Modal
        </div>
        <div class="sub-title">A simple and flexible modal component for Vue 3</div>
      </div>
    </div>
  </header>
  <main>
    <HelloWorld msg="Nt Modal" />
  </main>
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
