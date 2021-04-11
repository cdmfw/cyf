<template>
  <div class="my-music">
    <el-submenu  index="2" collapse="false">
      <div class="primary" slot="title">我的音乐</div>
      <el-menu-item
        index="/todo"
        :disabled="!$store.state.isLogin"
      >
        本地音乐
      </el-menu-item>
      <el-menu-item
        index="/todo"
        :disabled="!$store.state.isLogin"
      >
        下载管理
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: "MyMusic"
  }
</script>

<style scoped>

</style>
