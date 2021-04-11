<template>
  <div :style="{ height: height }" class="a-cover">
    <img :style="{ height: height, width: height }" :src="img" class="cover" >
    <span v-if="canClick" @click="$router.push(`/album/${routePath}`)" >
        <div class="play" :style="{ height: height, width: height }">
            <img src="@/assets/img/icon-play.svg" alt="">
        </div>
    </span>
    <img src="@/assets/img/al_cover_mask.png" class="mask" />
  </div>
</template>

<script>
  export default {
    name: "AlbumCoverStyle",
    props: {
      img:    { type: String,  default: '' },
      height: { type: String,  default: '150px' },
      routePath: { type: String,  default: '' },
      canClick: { type: Boolean,  default: true }
    }
  }
</script>

<style scoped>
  .a-cover {
    position: relative;
    display: inline-block;
  }

  .mask {
    height: 100%;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    object-fit:cover;
  }

  .play {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .a-cover span:hover .play {
      opacity: 1;           
  }

  .play img{
    height: 25%;
    width: 25%;
    border-radius:50%;
    background-color: white;
    background-blend-mode: multiply;
  }

</style>
