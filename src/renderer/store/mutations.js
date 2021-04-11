import types from "./types";

import dbmanager from "../dbmanager";

export default {
    [types.DB_DATA_LOADED] (state, { album }) { 
      state.album =  album;
      let songNum = 0;
      state.album.forEach(item => songNum += (item.songs ? item.songs.length : 0) );
      state.songNum = songNum;
      state.currentAlbum = state.album[0];
    },
    async [types.ALBUM_LIST] (state, { track }) { 
      state.album =  track;
      let songNum = 0;
      state.album.forEach(item => songNum += item.songNum);
      state.songNum = songNum;
      state.currentAlbum = state.album[0];
      await dbmanager.clearTable("album");
      await dbmanager.bulkAdd("album",state.album);
    },

    [types.CURRENT_ALBUM] (state, { name }) { 
      state.album.forEach(item => {
        if(item.name === name) {
          state.currentAlbum = item;
        }
      });
    },
    
    async [types.CURRENT_ALBUM_SONGS] (state, { showSongs, storeSongs }) { 
      state.currentAlbum.songs = showSongs;
      await dbmanager.deleteSongs(state.currentAlbum.name,state.currentAlbum.album_artist);
      await dbmanager.bulkAdd("song",storeSongs);
    },

    [types.UPDATE_LOGIN_STATUS] ( state, { isLogin, sId } ) {
      state.isLogin = isLogin
      state.SID = sId
    },

    [types.TOGGLE_PLAY_LIST] (state) {
      state.playlistVisible = !state.playlistVisible;
    },

    [types.HIDE_PLAY_LIST] (state) {
      state.playlistVisible = false;
    },
    
    [types.AUDIO_CHANGE] (state, { songsId, songsTracks, index } ) {
      state.player.playTracks = songsTracks
      state.player.current = index
      state.player.songsId = songsId
    },

    [types.CLEAR_PLAYLIST] (state) {
      state.player.songsId = 0
      state.player.current = 0
      state.player.playing = false
      state.player.playTracks = []
    },

    [types.AUDIO_INSERT] (state, { id, song }) {
      let current = state.player.current
      let index = state.player.playTracks.length !== 0? current + 1: 0
      state.player.playTracks.splice(index, 0, song)
      state.player.current = index
    },
    [types.AUDIO_PLAY] (state) { state.player.playing = true },
    [types.AUDIO_STOP] (state) { state.player.playing = false },
    
}
