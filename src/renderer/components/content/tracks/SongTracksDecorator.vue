<template>
  <song-tracks
    v-bind="$attrs"
    v-on="$listeners"
    :adapter="Object.assign(def_adapter, adapter)"
  />
</template>

<script>
  import SongTracks from "@/components/content/tracks/SongTracks";
  export default {
    name: "SongTracksDecorator",
    components: {SongTracks},
    props: {
      adapter: { type: Object, default: ()=> {} },
    },
    data() {
      return {
        def_adapter: {
          artists:    (song) => song['artists'].map((value) => {
            return {
              name: value['name'],
              id:   value['id'],
              alia: value['alias']
            }
          }),
          album_name: (song) => song['album']['name'],
          album_id  : (song) => song['album']['id'],
          duration:   (song) => song['duration'],
        }
      }
    }
  }
</script>

<style scoped>

</style>
