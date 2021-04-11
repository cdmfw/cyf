<template>
  <div class="search">
    <el-tabs v-model="type" @tab-click="onclick">
      <el-tab-pane label="单曲" name="1"></el-tab-pane>
    </el-tabs>

    <div class="result-total"> 为你找到 {{this.total}} 条内容</div>

    <div class="content">

      <rendering
        :component="current.component"
        v-bind="current.props"
        :total="total"
        :unique="keywords + type"
        :filling="filling"
        :index="true"
      />

    </div>

  </div>
</template>

<script>
  import { search } from "@/network/request";
  import SongTracks from "@/components/content/tracks/SongTracks";

  import Rendering from "@/components/layout/Rendering";

  export default {
    name: "SearchDetail",
    components: {Rendering},
    data() {
      return {
        current: {
          component: SongTracks,
          props: {},
        },
        keywords: '',
        type: '1',
        total: 0,
        dynComponent: {
          '1'     : { component: SongTracks,    props: { playType: 'next' }},

        },
        field: {
          '1'     : { result: 'songs',       total: 'songCount',      },
        }
      }
    },

    methods: {

      onclick(tab) {
        // this.$router.push(`/search?keywords=${this.keywords}&type=${this.type}`)
      },

      refresh() {
        const query = this.$route.query
        this.keywords = query.keywords
        this.type = query.type

        setTimeout(() => {
          this.current.component = this.dynComponent[this.type].component
          this.current.props = this.dynComponent[this.type].props
        })
      },

      filling(offset, limit) {
        return new Promise(resolve => {
          search(this.keywords, offset, limit, this.type).then(result => {
            this.total = result.data.total
            result.data.songs = result.data.songs.map((song,index) => {
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
            resolve(result.data.songs)
          })
        })
      },
    },

    created() {
      this.refresh()
    },

    watch: {
      $route(to, from) {
        this.refresh()
      }
    }
  }
</script>

<style scoped>
  .result-total {
    font-size: 10px;
    /*font-weight: bold;*/

    padding: 20px 10px;
  }

  .search {
    min-width: 700px;
  }

  .pagination {
    margin-top: 20px;
  }

  .content {
    width: 100%;
    min-height: 500px;
  }
</style>
