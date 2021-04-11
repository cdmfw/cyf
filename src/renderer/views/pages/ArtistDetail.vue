<template>
  <div class="artist-detail">
    <artist-info-show :artist="artist"/>

    <el-tabs class="tabs align-left" v-model="selected">
      <el-tab-pane label="专辑" name="album" :lazy="true">

        <artist-albums :datas="$store.state.album"/>
        
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="artist-detail" :lazy="true">

        <artist-desc />

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import ArtistInfoShow from "@/components/pages/topinfo/ArtistInfoShow";
  import ArtistAlbums from "@/components/content/complound/ArtistAlbums";
  import ArtistDesc from "@/components/content/complound/ArtistDesc";
  export default {
    name: "ArtistDetail",
    components: {ArtistDesc, ArtistAlbums, ArtistInfoShow},
    data() {
      return {
        id: 0,
        artist: {
          img1v1Url: "~@/assets/fafa.jpg",
          name: '陈一发儿', 
          musicSize: '10',
          albumSize: 10,
          mvSize: 10,
          id: 123,
        },
        selected: 'album',
      }
    },
  }
</script>

<style scoped>
  .artist-detail {
    min-width: 780px;
  }
</style>
