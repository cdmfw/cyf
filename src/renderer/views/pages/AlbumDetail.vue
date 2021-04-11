<template>
  <div class="album">
    <album-info-show :album="$store.state.currentAlbum"/>

    <el-tabs class="tabs align-left" v-model="selected" v-loading="loading">
      <el-tab-pane label="歌曲列表"  name="song-tracks" :lazy="true">

        <!--  歌曲列表-->
        <song-tracks-decorator :datas="songs" play-type="track"/>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import AlbumInfoShow from "@/components/pages/topinfo/AlbumInfoShow";
  import SongTracksDecorator from "@/components/content/tracks/SongTracksDecorator";
  import { album_songs } from "@/network/request";
  import StoreTypes from "@/store/types";
  import BusTypes from "@/utils/bus/types"
  export default {
    name: "AlbumDetail",
    components: {SongTracksDecorator, AlbumInfoShow},
    data() {
      return {
        name: "",
        songs: [],
        selected: 'song-tracks',
        loading: false
      }
    },

    created() {
      this.name = this.$route.params.name
      this.refresh()
    },

    methods: {
      refresh() {
        this.$store.commit(StoreTypes.CURRENT_ALBUM, {
          name: this.name
        })
        if(!this.$store.state.currentAlbum.songs || this.$store.state.currentAlbum.songs.length === 0) {
          this.loading = true;
          album_songs(this.$store.state.currentAlbum.name,
          this.$store.state.currentAlbum.album_artist,
          this.$store.state.SID
          ).then(result => {
            if(result.success) {
              const showSongs = result.data.songs.map((song,index) => {
                return {
                    "__index": index+1,
                    "id": song.id,
                    "name":song.title,
                    "artists":[{
                      "name": song.additional.song_tag.artist
                    }],
                    "album":{
                      "id": song.additional.song_tag.album,
                      "name": song.additional.song_tag.album,
                    },
                    "duration": song.additional.song_audio.duration,
                  }
              });
              const storeSongs = result.data.songs.map((song,index) => {
                return {
                    "id": song.id,
                    "title":song.title,
                    "artist": song.additional.song_tag.artist,
                    "album": song.additional.song_tag.album,
                    "album_artist": song.additional.song_tag.album_artist,
                    "duration": song.additional.song_audio.duration,
                    "path": song.path,
                    "filesize": song.additional.song_audio.filesize,
                  }
              });
              this.songs = showSongs;
              this.loading = false;
              this.$store.commit(StoreTypes.CURRENT_ALBUM_SONGS, {
                showSongs,
                storeSongs
              });
            } else {
              this.loading = false;
            }
          })
        } else {
          this.songs = this.$store.state.currentAlbum.songs;
        }
      },
    },

    watch: {
      $route() {
        this.name = this.$route.params.name
        this.refresh()
      }
    }
  }
</script>

<style scoped>
  .desc {
    margin-left: 15px;
  }

  .tabs {
    margin-top: 20px;
    min-height: 300px;
  }

</style>
