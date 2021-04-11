<template>
  <description :desc="$store.state.artistDesc"/>
</template>

<script>
  import Description from "@/components/common/Description";
  export default {
    name: "ArtistDesc",
    components: {Description},
  }
</script>

<style scoped>

</style>
