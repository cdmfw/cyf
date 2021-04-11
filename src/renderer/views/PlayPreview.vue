<template>
  <div class="play-preview">
    <img class="cover" v-show="$Check(song)" :src="coverUrl" alt="" @click="onclick">
    <div class="other">
      <div class="box">
        <p class="animate">
           {{ song['name'] }} 
        </p>
      </div>
      <!-- <span class="name"> {{ song['name'] }} </span> -->
      <!-- <br/> -->
      <artists class="artists" :artists="artists"/>
    </div>
  </div>
</template>

<script>
  import BusTypes from "@/utils/bus/types";
  import Artists from "@/components/content/label/Artists";

  export default {
    name: "PlayPreview",
    components: {Artists},
    data() {
      return {
        coverUrl: "",
        song: {},
        artists: []
      }
    },

    created() {
      this.$bus.$on(BusTypes.AUDIO_CHANGE, (id) => {
        var current = this.$store.state.player.current;
        var playTracks = this.$store.state.player.playTracks;
        this.song = playTracks[current];
        this.artists = playTracks[current].artists;
        this.coverUrl = `http://localhost:11015/getsongcover?id=${playTracks[current].id}`;
      
      })

      this.$bus.$on(BusTypes.CLEAR_PLAYLIST, (id) => {
        this.song = {};
        this.artists = [];
        this.coverUrl = "";
      
      })
    },

    methods: {
      onclick() {
        this.$bus.$emit(BusTypes.TOGGEN_PLAYING_PLANE)
      }
    }
  }
</script>

<style scoped>
  .play-preview {
    position: relative;
    height: 40px;
    min-width: 130px;
  }

  .other {
    box-sizing: border-box;
    padding: 0 0 0 50px;
    width: 100%;
    height: 100%;

    font-size: 11px;
    font-weight: bold;
    color: #616161;
  }

  .cover, .other {
    float: left;
  }

  .artists {
    height: 17px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
  }

  .cover {
    position: absolute;
    height: 40px;
    width: 40px;
    border: 1px solid #e0e0e0;
    object-fit:cover;
    background-blend-mode: multiply;
    cursor: pointer;
  }

  .box {
      overflow: hidden;
      height: 17px;
      margin: 0 auto;
      position: relative;
  }

  .animate {
      margin: 0;
      display: inline-block;
      padding-left: 20px;
      white-space: nowrap;
      animation: 5s wordsLoop linear infinite normal;
  }

  @keyframes wordsLoop {
      0% {
          transform: translateX(0px);
          -webkit-transform: translateX(0px);
      }
      100% {
          transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
      }
  }

  @-webkit-keyframes wordsLoop {
      0% {
          transform: translateX(0px);
          -webkit-transform: translateX(0px);
      }
      100% {
          transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
      }
  }
</style>
