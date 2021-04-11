<template>
  <div class="playlist">
    <div class="playlist-title">
      <el-button round size="mini">播放列表</el-button>
    </div>
    <div class="content">
        <play-song-tracks :datas="$store.state.player.playTracks"/>
    </div>

  </div>
  </div>
</template>

<script>
  import PlaySongTracks from "@/components/content/tracks/PlaySongTracks";
  export default {
    name: "Playlist",
    components: {
        PlaySongTracks
    },
    data() {
      return {
        type: "1",
        songs: [{
            name: "123",
        }]
      }
    },
    methods: {

      onclick(tab) {
        // this.$router.push(`/search?keywords=${this.keywords}&type=${this.type}`)
      },
    }
  }
</script>

<style scoped>
    .playlist {
      height: 100%;
      box-sizing: border-box;
    }

    .playlist-title {
      text-align:center;
      margin: 5px 50px;
      border-radius: 50%;
    }

    .playlist .content {
      height: calc(100% - 40px);
    }

</style>
