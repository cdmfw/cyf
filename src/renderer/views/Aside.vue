<template>
  <div class="app-aside light-scroll">
    <el-menu router mode="vertical" :default-openeds="['1', '2']">
      
      <my-music/>
    
      <own-song-list/>

    </el-menu>
  </div>
</template>

<script>
  import MyMusic from "@/components/aside/MyMusic";
  import OwnSongList from "@/components/aside/OwnSongList";

  export default {
    name: "Aside",
    components: {
      MyMusic,
      OwnSongList,
    }
  }
</script>

<style scoped>
  .app-aside {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 52px);

    overflow: auto;
  }
</style>
