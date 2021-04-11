<template>
  <div class="a-cover">
    <album-cover-style height="120px" :img="adapter.coverUrl(album)" :routePath="`${adapter.name(album)}`" />
    <span class="name" @click="$router.push(`/album/${adapter.name(album)}`)">{{ adapter.name(album) }}</span>
    <div
      v-if="!showCreator"
      class="publish-time">
      {{ adapter.publishTime(album) | dateTimeFormat('yyyy-MM-dd') }}
    </div>
    <div v-else>
      <artists class="artists" :artists="adapter.artists(album)"/>
    </div>
  </div>
</template>

<script>
  import AlbumCoverStyle from "@/components/content/covers/AlbumCoverStyle";
  import Artists from "@/components/content/label/Artists";
  export default {
    name: "AlbumCover",
    components: {Artists, AlbumCoverStyle},
    props: {
      album:   { type: Object,   default: ()=> {} },
      adapter: { type: Object,   default: ()=> {} },
      showCreator: { type: Boolean, default: false }
    }
  }
</script>

<style scoped>
  .a-cover {
    width: 140px;
    font-size: 11px;
  }

  .name {
    width: 120px;
    letter-spacing: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }

  .publish-time, .artists {
    color: #666666;
  }

  .cover {
    cursor: pointer;
  }
</style>
