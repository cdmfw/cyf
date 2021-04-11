<template>
   <grid class="album-matrices" :list="datas" v-bind="$attrs" :col="5">
    <template v-slot:default="slotProps">
      <album-cover
        class="album-cover"
        :album="slotProps.item"
        :adapter="Object.assign(def_adapter, adapter)"
        v-bind="$attrs"
      />
    </template>
  </grid>
</template>

<script>
  import Grid from "@/components/layout/Grid";
  import AlbumCover from "@/components/content/covers/AlbumCover";
  export default {
    name: "AlbumMatrices",
    components: {AlbumCover, Grid},
    props: {
      datas:    { type: Array,    default: () => [] },
      adapter:  { type: Object,   default: () => {} }
    },

    data() {
      return {
        def_adapter: {
          coverUrl: (album) =>  {
            return album.name ? `http://localhost:11015/getcover?album_name=${album.name}&album_artist_name=${album.album_artist}` : "";
          },
          name:     (album) => album['name'],
          id:       (album) => album['id'],
          publishTime: (album) => album['publishTime'],
          artists: (album) => {
            return album['artists'].map(value => {
              return {
                id: value['id'],
                name: value['name'],
                alia: value['alias']
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
