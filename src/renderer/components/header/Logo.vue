<template>
  <span class="logo" @click="toHome()"></span>
</template>

<script>
  export default {
    name: "Logo",
    methods: {
      toHome() {
        this.$router.push(`/`)
      },
    }
  }
</script>

<style scoped>
  .logo {
    display: inline-block;
    height: 30px;
    width: 120px;
    cursor: pointer;
    background-image: url("~assets/logo.png");
    background-size: 100% 100%;
    -webkit-app-region: no-drag;
  }
</style>
