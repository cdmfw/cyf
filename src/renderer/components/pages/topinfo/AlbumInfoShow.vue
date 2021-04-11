<template>
  <div v-if="$Check(album)" class="album-info-show">
    <div class="left">
      <album-cover-style height="170px" :canClick="false" :img="adapter.coverUrl(album)"/>
    </div>
    <div class="right">
      <div class="name"> {{ album['name'] }} </div>
      <div class="play">
        <div class="play-all">播放全部</div>
        <div class="add-all">+</div>
      </div>
      <span>歌手：</span> <artist class="artist"
                                 :name="album['album_artist']"/>
      <br/>
      <span>发行时间：{{ album['publishTime'] | dateTimeFormat('yyyy-MM-dd') }}</span> <br/>
      <span>发行公司：{{ album['company'] }}</span>
    </div>
  </div>
</template>

<script>
  import AlbumCoverStyle from "@/components/content/covers/AlbumCoverStyle";
  import Artist from "@/components/content/label/Artist";
  export default {
    name: "AlbumInfoShow",
    components: {Artist, AlbumCoverStyle},
    props: {
      album: { type: Object,  default: ()=> {} }
    },
    data() {
      return {
        adapter: {
          coverUrl: (album) =>  {
            return album.name ? `http://localhost:11015/getcover?album_name=${album.name}&album_artist_name=${album.album_artist}` : "";
          },
        }
      }
    }
  }
</script>

<style scoped>
  .album-info-show {
    display: flex;
  }

  .left {
    padding-left: 25px;
  }

  .right {
    padding-left: 40px;
  }

  .name {
    font-size: 19px;
  }

  .right .artist {
    color: #293cc2;
  }

  .right span {
    font-size: 12px;
    color: #666;
  }

  .play {
    display: flex;
    width: fit-content;
    font-size: 12px;
  }
  .play .play-all{
    border: 1px solid #e0e0e0;
    border-radius: 30px 0px 0px 30px;
    padding: 2px 5px 2px 10px;
  }

  .play .add-all{
    border: 1px solid #e0e0e0;
    border-radius: 0px 30px 30px 0px;
    padding: 2px 5px 2px 5px;
  }
</style>
