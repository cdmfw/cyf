
import types from "./types";

export default {
    [types.AUDIO_CHANGE] (content, { songsId, index }) {
      content.commit(
          types.AUDIO_CHANGE,
          { songsId, songsTracks: content.state.player.playTracks, index } )
    }
}