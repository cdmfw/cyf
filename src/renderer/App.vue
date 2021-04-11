<template>
  <div id="app">
    <love-fafaer-window/>
  </div>
</template>

<script>
    import LoveFafaerWindow from '@/views/Window.vue'
    import { login_in,all_album } from "@/network/request";
    import StoreTypes from "@/store/types";
    import BusTypes from "@/utils/bus/types"

    export default {
        components: { LoveFafaerWindow },
        beforeCreate() {
            if(this.$router.path !== '/'){
                this.$router.replace('/')
            }
            this.$bus.$on(BusTypes.USER_LOGIN, () => {
              this.loadDbData()
            })
            this.$bus.$on(BusTypes.DB_DATA_LOADED, () => {
                this.initAlbum()
            })
            login_in().then(result => {
              if(result.success) {
                this.$store.commit(StoreTypes.UPDATE_LOGIN_STATUS, {
                  isLogin: true,
                  sId: result.data.sid
                })
                this.$bus.$emit(BusTypes.USER_LOGIN)
              } else {
                console.log("登录失败");
              }
            })
        },
        methods: {
          loadDbData() {
            this.$dbmanager.loadDbData().then(result => {
              this.$store.commit(StoreTypes.DB_DATA_LOADED, {
                album: result.album
              });
              this.$bus.$emit(BusTypes.DB_DATA_LOADED);
            });
          },
          initAlbum() {
            if(!this.$store.state.album || this.$store.state.album.length === 0) {
              all_album().then(result => {
                if(result.success) {
                  console.log(result);
                  this.$store.commit(StoreTypes.ALBUM_LIST, {
                    track: result.data.albums
                  })
                }
              })
            }
          }
        }
    }

</script>

<style>
  @import "assets/css/base.css";

  body, html, #app {
    height: 100%;
    width: 100%;
  }
</style>