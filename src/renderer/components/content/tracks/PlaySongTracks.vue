<template>
  <div class="play-song-track">
    <div class="title">
      <div class="title-left">总{{datas.length}}首</div>
      <div class="title-right"><span class="col-clear" @click="clearPlayList"><icon
          class="icon-clear"
          size="12px"
          :normal="require('@/assets/img/delete.svg')"
        />清空</span></div>
    </div>
    <div v-if="$Check(datas)" class="content light-scroll">
      <el-row  v-for="(song, index) in datas" :key="index"
        @dblclick.native="onClick(adter.index(song) - 1,
        adter.id(song))"
      >
        <el-col :span="2">
            <div class="play-icon" v-show="$store.state.player.current === index">
                <img v-if="$store.state.player.playing" src="@/assets/img/icon-play.svg" alt="">
                <img v-else src="@/assets/img/icon-stop.svg" alt="">
            </div>
        </el-col>
        <el-col :span="12">{{ adter.name(song) }}</el-col>
        <el-col :span="6">
          <album :name="adter.album_name(song)" :id="adter.album_id(song)"/>
        </el-col>
        <el-col :span="2">{{ adter.duration(song) | timeLongFormat(false)}}</el-col>
        <el-col :span="2">
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import BusTypes from "@/utils/bus/types";

  import Artists from "@/components/content/label/Artists";
  import Album from "@/components/content/label/Album";
  import Icon from "@/components/common/Icon";
  import StoreTypes from "@/store/types";
  export default {
    name: "PlaySongTracks",
    components: {Album, Artists, Icon},
    props: {
      id:      { type: Number, default: null },
      playType:{ type: String, default: 'songs'},
      datas:   { type: Array,  default: () => [] },
      adapter: { type: Object, default: () => {} }
    },

    data() {
      return {
        def_adapter: {
          index     :  (song) => song['__index'],
          name      :  (song) => song['name'],
          artists   :  (song) => song['artists'].map((value) => {
            return {
              name: value['name'],
              id: value['id'],
              alia: value['alias']
            }
          }),
          album_name:  (song) => song['album']['name'],
          album_id  :  (song) => song['album']['id'],
          duration  :  (song) => song['duration'],
          id:         (song) => song['id']
        }
      }
    },

    methods: {
      onClick(index, id) {
        this.$store.dispatch(StoreTypes.AUDIO_CHANGE, {
            songsId: id,
            index: index
          })
        this.$bus.$emit(BusTypes.AUDIO_PLAY, { id })
      },
      clearPlayList() {
        console.log("1231231");
        this.$bus.$emit(BusTypes.CLEAR_PLAYLIST)
      }
    },

    computed: {
      adter() {
        return Object.assign(this.def_adapter, this.adapter)
      }
    }
  }
</script>

<style scoped>
  .play-song-track {
    height: 100%;
    font-size: 8px;
  }

  .play-song-track .el-row {
    height: 2.5em;
    border-radius: 4px;
  }

  .play-song-track .el-col {
    text-overflow: ellipsis;
    line-height: 2.5em;
    height: 2.5em;
    overflow: hidden;
  }

  .play-song-track .el-row:nth-of-type(odd) {
    background-color: #fafafa;
  }

  .index {
    text-align: center;
  }

  .play-song-track .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    border-bottom: 1px solid #e0e0e0;;
  }

  .play-song-track .title .title-left{
    margin-left: 30px;
  }

   .play-song-track .title .title-right{
    margin-right: 30px;
  }

  .play-icon {
      text-align: center;
  }

  .play-icon img{
      height: 50%;
      width: 50%;
      vertical-align: middle;
  }
  .col-clear {
    cursor: pointer;
  }

  .icon-clear {
    margin-right: 2px;
  }

  .play-song-track .content {
    height: calc(100% - 30px);
    overflow: auto;
  }
</style>
