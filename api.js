indexedDB.deleteDatabase('orderdb')

专辑封面
https://magict.cn:5001/webapi/AudioStation/cover.cgi?
api=SYNO.AudioStation.Cover
&version=3
&method=getcover
&album_name=%E5%BD%A9%E8%9B%8B
&album_artist_name=%E9%99%88%E4%B8%80%E5%8F%91%E5%84%BF
&library=all 

陈一发儿，山城降生， 前设计院院花，直播界泥石流，不睡者，万儿之母，暴击女王，斗鱼主机区的解放者，约德尔人、霍比特人的女王，67373统治者暨418094守护者，大泳池划水的卡丽熙 ，网易云音乐登顶之人，女神篇台柱子，著名移动景点，丹妮一发·陈格利安。


文件夹获取文件
POST https://magict.cn:5001/webapi/AudioStation/folder.cgi 
offset=4096
&limit=1024
&library=all
&additional=song_tag%2Csong_audio%2Csong_rating
&recursive=false
&api=SYNO.AudioStation.Folder
&method=list
&version=3
&_sid=8Vtiwn6RmqAlubw4MPpmdOFR5hdFLC07LwwrulurhaUKWtJbuB0GpvDbKB0jrgWPoCVYd9gtnY1nb04b_HTjG8

专辑获取文件
POST https://magict.cn:5001/webapi/AudioStation/album.cgi 
offset=0
&limit=1024
&library=all
&additional=avg_rating
&api=SYNO.AudioStation.Album
&method=list
&version=3
&_sid=8Vtiwn6RmqAlubw4MPpmdOFR5hdFLC07LwwrulurhaUKWtJbuB0GpvDbKB0jrgWPoCVYd9gtnY1nb04b_HTjG8

获取歌
POST https://magict.cn:5001/webapi/AudioStation/song.cgi 
offset=0
&limit=1024
&library=all
&id=music_23236
&additional=song_rating
&api=SYNO.AudioStation.Song
&method=getinfo
&version=2
&_sid=8Vtiwn6RmqAlubw4MPpmdOFR5hdFLC07LwwrulurhaUKWtJbuB0GpvDbKB0jrgWPoCVYd9gtnY1nb04b_HTjG8


歌曲封面
https://magict.cn:5001/webapi/AudioStation/cover.cgi?
api=SYNO.AudioStation.Cover
&version=3
&method=getsongcover
&id=music_17326 

歌曲流
https://magict.cn:5001/webapi/AudioStation/stream.cgi?
api=SYNO.AudioStation.Stream
&method=transcode
&version=1
&id=music_17326
&format=mp3
&_sid=8Vtiwn6RmqAlubw4MPpmdOFR5hdFLC07LwwrulurhaUKWtJbuB0GpvDbKB0jrgWPoCVYd9gtnY1nb04b_HTjG8
&bitrate=192000
&ext=.mp3


{
	"data": {
		"offset": 0,
		"songs": [{
				"additional": {
					"song_audio": {
						"bitrate": 224000,
						"channel": 2,
						"codec": "mp3",
						"container": "mp3",
						"duration": 205,
						"filesize": 5888182,
						"frequency": 44100
					},
					"song_rating": {
						"rating": 5
					},
					"song_tag": {
						"album": "2019茶话会",
						"album_artist": "陈一发儿",
						"artist": "陈一发儿",
						"comment": "",
						"composer": "",
						"disc": 0,
						"genre": "",
						"track": 0,
						"year": 0
					}
				},
				"id": "music_16425",
				"path": "/music/caidan/2019五一茶话会/五一茶话会 - Come and get your love.mp3",
				"title": "五一茶话会 - Come and get your love",
				"type": "file"
			}, {
				"additional": {
					"song_audio": {
						"bitrate": 320000,
						"channel": 2,
						"codec": "mp3",
						"container": "mp3",
						"duration": 238,
						"filesize": 9644605,
						"frequency": 44100
					},
					"song_rating": {
						"rating": 5
					},
					"song_tag": {
						"album": "2019茶话会",
						"album_artist": "陈一发儿",
						"artist": "陈一发儿",
						"comment": "",
						"composer": "",
						"disc": 0,
						"genre": "",
						"track": 0,
						"year": 0
					}
				},
				"id": "music_16426",
				"path": "/music/caidan/2019五一茶话会/五一茶话会 - Lost star.mp3",
				"title": "五一茶话会 - Lost star",
				"type": "file"
			}, {
				"additional": {
					"song_audio": {
						"bitrate": 320000,
						"channel": 2,
						"codec": "mp3",
						"container": "mp3",
						"duration": 212,
						"filesize": 8607019,
						"frequency": 44100
					},
					"song_rating": {
						"rating": 5
					},
					"song_tag": {
						"album": "2019茶话会",
						"album_artist": "陈一发儿",
						"artist": "陈一发儿",
						"comment": "",
						"composer": "",
						"disc": 0,
						"genre": "",
						"track": 0,
						"year": 0
					}
				},
				"id": "music_16427",
				"path": "/music/caidan/2019五一茶话会/五一茶话会 - New soul.mp3",
				"title": "五一茶话会 - New soul",
				"type": "file"
			}, {
				"additional": {
					"song_audio": {
						"bitrate": 320000,
						"channel": 2,
						"codec": "mp3",
						"container": "mp3",
						"duration": 203,
						"filesize": 8247602,
						"frequency": 44100
					},
					"song_rating": {
						"rating": 5
					},
					"song_tag": {
						"album": "2019茶话会",
						"album_artist": "陈一发儿",
						"artist": "陈一发儿",
						"comment": "",
						"composer": "",
						"disc": 0,
						"genre": "",
						"track": 0,
						"year": 0
					}
				},
				"id": "music_16428",
				"path": "/music/caidan/2019五一茶话会/五一茶话会 - Somewhere only we know.mp3",
				"title": "五一茶话会 - Somewhere only we know",
				"type": "file"
			}, {
				"additional": {
					"song_audio": {
						"bitrate": 320000,
						"channel": 2,
						"codec": "mp3",
						"container": "mp3",
						"duration": 279,
						"filesize": 11285089,
						"frequency": 44100
					},
					"song_rating": {
						"rating": 5
					},
					"song_tag": {
						"album": "2019茶话会",
						"album_artist": "陈一发儿",
						"artist": "陈一发儿",
						"comment": "",
						"composer": "",
						"disc": 0,
						"genre": "",
						"track": 0,
						"year": 0
					}
				},
				"id": "music_16429",
				"path": "/music/caidan/2019五一茶话会/五一茶话会 - 你在终点等我.mp3",
				"title": "五一茶话会 - 你在终点等我",
				"type": "file"
			}
		],
		"total": 170
	},
	"success": true
}

