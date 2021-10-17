<template>
  <div id="app">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import Content from './components/layouts/Content.vue'

export default {
  name: 'App',
  components: {
    Header,
    Content
  }
}
</script>

<style lang="scss">
@import "./styles/all";
// @import "./assets/all";
</style>
