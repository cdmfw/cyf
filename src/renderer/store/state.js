export default {
    isLogin: false,
    SID: null,
    album: [],

    liked_song: [],
    playlist: [],
    
    playlistVisible: false,
    currentAlbum: {
      artist:{},
      songs:[]
    },
    songNum: 0,
    mv: [],
    artistDesc: [
      {
        ti: "简介",
        txt:"陈一发儿，山城降生， 前设计院院花，直播界泥石流，不睡者，万儿之母，暴击女王，斗鱼主机区的解放者，约德尔人、霍比特人的女王，67373统治者暨418094守护者，大泳池划水的卡丽熙 ，网易云音乐登顶之人，女神篇台柱子，著名移动景点，丹妮一发·陈格利安。"
      }
    ],
    player: {
      songsId: 0,
      current: 0,
      playing: false,
      playTracks: [],
    }
  }