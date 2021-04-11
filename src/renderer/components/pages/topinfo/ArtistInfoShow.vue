<template>
  <div class="artist-info-show">
    <div class="left">
      <img src="~@/assets/fafa.jpg" />
    </div>
    <div class="right">
      <div class="name">
        <artist
          class="artist"
          :disabled="true"
          :name="artist['name']"
          :id="artist['id']"
          :alia="artist['alias']"
        />
      </div>
      <br/>
      <span>单曲数：{{ $store.state.songNum }}</span> <br/>
      <span>专辑数：{{ $store.state.album.length }}</span> <br/>
      <span>MV数：{{ $store.state.mv.length }} </span>
    </div>
  </div>
</template>

<script>
  import Artist from "@/components/content/label/Artist";
  export default {
    name: "ArtistInfoShow",
    components: {Artist},
    props: {
      artist: { type: Object,  default: ()=> {
      } }
    }
  }
</script>

<style scoped>
  .artist-info-show {
    display: flex;
  }

  .left img {
    border-radius: 6px;
    height: 170px;
    width: 170px;
  }

  .left {
    padding-left: 5px;
  }

  .right {
    padding-left: 40px;
  }

  .name .artist {
    font-size: 19px;
    margin-bottom: 20px;
    color: #000;
  }

  .right span {
    font-size: 12px;
    color: #666;
  }

</style>
