<template>
  <div class="search" style="display: inline-block">
    <input v-model="key"
           class="search-box"
           type="search"
           placeholder="搜索音乐"
           v-on:focus="focus = true"
           v-on:focusout.capture="focus = false"
           v-on:keydown.enter="toSearch(key)">
    <span class="el-icon-search search-icon" @click="toSearch(key)"></span>
  </div>
</template>

<script>

  export default {
    name: "Search",
    data() {
      return {
        key: '',
        hots: null,
        suggest: [],

        searchPreview: null,
        isPreview: false,
        focus: false
      }
    },

    methods: {
      toSearch(keyword, type = 1) {
        this.$router.push(`/search?keywords=${keyword}&type=${type}`)
      }
    },
  }
</script>

<style scoped>
  .search {
    position: relative;

    -webkit-app-region: no-drag;
  }

  .search-box::-webkit-input-placeholder {
    font-size: 11px;
    font-weight: bold;
  }

  .search-box::-moz-placeholder {
    font-size: 12px;
    font-weight: bold;
  }

  .search-box::-ms-input-placeholder {
    font-size: 12px;
    font-weight: bold;
  }

  .search .search-box {
    height: 24px;
    width: 175px;
    padding-right: 25px;

    font-size: 11px;
    text-indent: 10px;
    outline: none;
    border: none;
    border-radius: 12px;
  }

  .search-box {
    transition: all 0.3s 0.2s;
  }

  .search-box:hover, .search-box:focus {

    width: 230px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .search-icon {
    font-size: 13px;
    width: 30px;
    cursor: pointer;
    transform: translate(-23px, 0);
  }

  .search-preview {
    z-index: 1000;
    position: absolute;
    top: 30px;

    border-radius: 5px;
    background-color: white;

    overflow: auto;
    transition: all 0.4s;

    opacity: 1;
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
