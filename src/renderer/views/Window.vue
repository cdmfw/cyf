<template>
  <div class="window eff-shadow">
    <el-container class="__container">
      <el-header height="45px" >
        <!--顶部-->
        <app-header/>

      </el-header>
      <el-container class="main-container">

        <el-aside class="aside" width="240px" @click.native="onClick()">

          <!--侧边栏-->
          <app-aside/>

        </el-aside>
        <el-main class="light-scroll" @click.native="onClick()">
          <!--    主要视图      -->
          
          <router-view/>

          

        </el-main>

        <div class="el-playlist"  v-show="$store.state.playlistVisible">

          <!--侧边栏-->
          <app-playlist/>

        </div>

        <playing/>

      </el-container>
      <el-footer height="45px">

        <app-footer/>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
import AppHeader from '@/views/Header.vue';
import AppAside from '@/views/Aside.vue'
import AppFooter from "@/views/Footer";
import AppPlaylist from "@/views/Playlist.vue";
import Playing from "@/views/Playing";
import StoreTypes from "@/store/types";

export default {
  name: 'Window',
  components: {
    Playing,
    AppFooter,
    AppHeader,
    AppAside,
    AppPlaylist
  },
  methods: {
      onClick() {
        this.$store.commit(StoreTypes.HIDE_PLAY_LIST)
      }
  }
}
</script>

<style>
  .window {
    height: 100%;
    width: 100%;
    overflow: hidden;    
    background-color: white;
  }

  .window .el-aside {
    resize: horizontal;
    min-width: 230px;
    border-right: 1px solid #e0e0e0;;
  }

  .window .__container {
    height: 100%;
  }

  .__container .main-container {
    position: relative;
    height: calc(100% - 90px);
  }

  .window .el-header {
    background-color: #eceff1;
  }

  .window .el-footer {
    padding: 0 10px;
    border-top: 1px solid #e0e0e0;;
  }

  .window .el-playlist {
    right: 0px;
    top: 0px;
    position: absolute;
    height: 100%;
    width: 310px;
    border-left: 1px solid #e0e0e0;;
    background-color: #FFFFFF;
    z-index: 101;
  }
</style>
