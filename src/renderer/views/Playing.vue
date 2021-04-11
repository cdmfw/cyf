<template>
  <div v-if="$Check(song)" class="play" :class="{ 'show': show }">
    <div class="container" :class="{ 'show-secondary': secondary }">
      <div class="content">

        <blur-background
          height="400px"
          :bg="coverUrl"
        >

          <div class="primary">

            <div class="left">

              <discplayer
                class="discplayer"
                :cover="coverUrl"
                :playing="$store.state.player.playing"
              />

              <div class="option">

                <like :id="id"/>
                <collect :id="id"/>

              </div>
            </div>

            <div class="right">

              <song-base-info :song="song"/>
              <lyric class="lyric" :id="id"/>

            </div>

          </div>

        </blur-background>
      </div>
    </div>
  </div>
</template>

<script>
  import {future} from "@/utils/utils";

  import BlurBackground from "@/components/common/BlurBackground";
  import Discplayer from "@/components/play/Discplayer";
  import SongBaseInfo from "@/components/play/SongBaseInfo";
  import Lyric from "@/components/play/Lyric";
  import BusTypes from "@/utils/bus/types";
  import Like from "@/components/play/Like";
  import Collect from "@/components/play/Collect";
  export default {
    name: "Play",
    components: {Collect, Like, Lyric, SongBaseInfo, Discplayer, BlurBackground},
    data() {
      return {
        id: 0,
        coverUrl: "",
        song: {},
        show: false,
        secondary: false,
        animating: false,
      }
    },

    created() {
      this.$bus.$on(BusTypes.AUDIO_CHANGE, (id)=> {
        var current = this.$store.state.player.current;
        var playTracks = this.$store.state.player.playTracks;
        this.song = playTracks[current];
        this.id = playTracks[current].id
        this.coverUrl = `http://localhost:11015/getsongcover?id=${playTracks[current].id}`;
      })

      this.$bus.$on(BusTypes.OPEN_PLAYING_PLANE, ()=> {
        this.open()
      })

      this.$bus.$on(BusTypes.CLOSE_PLAYING_PLANE, ()=> {
        this.close()
      })

      this.$bus.$on(BusTypes.TOGGEN_PLAYING_PLANE, ()=> {
        this.toggen()
      })
    },

    methods: {
      open() { this.show = true },
      close() { this.show = false },
      toggen() { this.show = !this.show },

    },

    watch: {
      show: function () {
        this.animating = true
        future(function () { this.animating = false }, 500, this)
      },

      secondary: function () {
        this.animating = true
        future(function () { this.animating = false }, 500, this)
      },

      $route(to, from) {
        // 对路由变化作出响应...
        if (this.show) this.close()
      }
    }
  }
</script>

<style scoped>
  .play, .container {
    transition: all 0.5s;
  }

  .play {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: white;
    overflow: hidden;
    z-index: 100;

    visibility: hidden;
    transform: translate(-100%, 0px);
  }

  .play.show {
    visibility: visible;
    transform: translate(0, 0) !important;
  }

  .container.show-secondary {
    transform: translate(0, -100%);
  }

  .container {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }

  .content, .secondary {
    width: 100%;
    height: 100%;
  }

  .secondary {
    overflow: auto;
    box-sizing: border-box;
    padding: 15px 5px;
  }

  .left, .right {
    box-sizing: border-box;
    flex-grow: 1;
    width: 50%;
  }

  .option {
    display: flex;
    justify-content: center;
    width: 260px;
    box-sizing: border-box;
    padding: 0 15px;
    margin-top: 35px;

    opacity: 0.1;
  }

  .option > * {
    margin: 0 10px;
  }

  .right {
    padding-top: 50px;
    padding-left: 20px;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 90px;
  }

  .lyric {
    margin-top: 20px;
  }

  .primary {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin: 0 auto;
  }

  .but-back {
    display: inline-block;
    position: absolute;
    left: 30px;
    top: 20px;
    height: 30px;
    width: 30px;

    cursor: pointer;
  }

  .pull-down {
    position: absolute;
    right: 30px;
    bottom: 20px;
    height: 30px;
    width: 30px;

    transition: all 0.3s;
    opacity: 0.3;

    cursor: pointer;
  }

  .pull-down.up {
    transform: rotate(180deg);
  }

  .pull-down:hover {
    opacity: 0.8;
  }
</style>
