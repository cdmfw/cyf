<template>
  <div class="own-song-list">
    <el-submenu index="3" collapse="false" >
      <div class="primary" slot="title">创建的歌单</div>
      <el-menu-item
        v-for="(item, index) in $store.state.playlist"
        :index="`/playlist/${item.id}`"
        :key="item.id">{{item.name.trim()}}
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: "OwnSongList",
    data() {
      return { playlist: {} }
    },
    created(){

    }
  }
</script>

<style scoped>

</style>
