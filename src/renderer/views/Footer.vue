<template>
  <div class="app-footer">

    <play-preview/>
    <play-control-bar/>

  </div>
</template>

<script>
  import PlayPreview from "@/views/PlayPreview";
  import PlayControlBar from "@/components/footer/PlayControlBar";
  export default {
    name: "Footer",
    components: {PlayControlBar,PlayPreview}
  }
</script>

<style scoped>
  .app-footer {
    height: 100%;
    display: flex;
    justify-content:space-between;
  }
</style>
