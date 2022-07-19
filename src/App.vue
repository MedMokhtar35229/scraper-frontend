<template>
  <!--eslint-disable-->
  <div id="app">
    <Nav title="Scraper" />
    <router-view />
  </div>
</template>
<script>
import Nav from "./components/Nav.vue";
export default {
  components: { Nav },
};
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>





