var express = require('express');
var http = require('http');
var cors = require('cors');
var axios = require('axios');

var app = express();

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:9080', // web前端服务器地址
}));

function params2url(param) {
  let paramArr = [];
  for(let key in param) {
    paramArr.push(`${key}=${param[key]}`);
  }
  return paramArr.join("&");
}

function createRequest(path, method, data, cookie, callback) {
  var ne_req = '';
  
  var http_client = http.request({
    hostname: 'magict.cn',
    port: 5000,
    method: method,
    path: path,
    headers: {
      'Referer': 'http://magict.cn:5000/',
      // 'Content-Type': 'application/json',
      'Cookie': cookie,
    },
  }, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      ne_req += chunk;
    });
    res.on('end', function() {
      if (res.headers['set-cookie']) {
          callback(ne_req, res.headers['set-cookie']);
        } else {
          callback(ne_req);
        }
    })
  });
  if (method == 'POST') {
    http_client.write(data);
  }
  http_client.end(); 
}

app.get('/loginIn', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  let params = {
    api: "SYNO.API.Auth",
    version: "3",
    method: "login",
    account: "cyfwlp",
    passwd: "5267373",
    session: "AudioStation",
    format: "cookie"
  };
  createRequest(
    `/webapi/auth.cgi?${params2url(params)}`,
    'GET', 
    null, 
    cookie, 
    function(res, cookie) {
    response.setHeader("Content-Type", "application/json");
    response.set({
        'Set-Cookie': cookie,
    });
    response.send(res);
  });
});


app.get('/allAlbum', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  let params = {
    api: "SYNO.AudioStation.Album",
    version: "1",
    method: "list",
    library: "all",
    sort_direction: "asc",
    offset: "0",
    sort_by: "name",
    limit: "5000"
  };
  createRequest(
    '/webapi/AudioStation/album.cgi', 
    'POST', 
    params2url(params),
    cookie, 
    function(res) {
    response.setHeader("Content-Type", "application/json");
      if(res) {
        res = JSON.parse(res);
        if(res.success) {
          let albums = res.data.albums;
          let axiosArray = []
          for (let i = 0; i < albums.length; i++) {
            let params = {
              api: "SYNO.AudioStation.Song",
              version: "3",
              method: "list",
              library: "all",
              additional: "song_tag,song_audio,song_rating",
              offset: 0,
              album: albums[i].name,
              album_artist: albums[i].album_artist,
              limit: 1
            };
            axiosArray.push(axios({
              method: 'post',
              url: `http://magict.cn:5000/webapi/AudioStation/song.cgi`,
              data: params2url(params),
              headers: {
                  "Cookie" : cookie,
              }
            }));
          }
          axios
            .all(axiosArray)
            .then(axios.spread((...responses) => {
              responses.forEach((songres,inx) => {
                if(songres && songres.data && songres.data.success){
                  res.data.albums[inx].songNum = songres.data.data ? songres.data.data.total : 0;
                }
              })
              response.send(res);
            }))
            .catch(error => {
              response.send(res);
            })
        }
      }
  });
});

app.get('/getcover', function (request, response) {
  var album_name = request.query['album_name']? encodeURI(request.query['album_name']) : "";
  var album_artist_name = request.query['album_artist_name']? encodeURI(request.query['album_artist_name']) : "";
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  let params = {
    api: "SYNO.AudioStation.Cover",
    version: "3",
    method: "getcover",
    library: "all",
    album_name: album_name,
    album_artist_name: album_artist_name,
  };
  axios.get(
  `http://magict.cn:5000/webapi/AudioStation/cover.cgi?${params2url(params)}`,
  {
    responseType: 'stream', //这里只能是arraybuffer，不能是json等其他项，blob也不行
    headers: {
        "Cookie" : cookie,
    }
  }).then(res => {
    response.set(res.headers) //把整个的响应头塞入更优雅一些
    res.data.pipe(response)
  })
})

app.get('/songstream', function (request, response) {
  var sId = request.query['sId']? encodeURI(request.query['sId']) : "";
  var id = request.query['id']? encodeURI(request.query['id']) : "";
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  let params = {
    api: "SYNO.AudioStation.Stream",
    method: "transcode",
    version: "1",
    id: id,
    format: "mp3",
    bitrate: 192000,
    ext: ".mp3",
    _sid: sId
  };
  axios.get(
  `http://magict.cn:5000/webapi/AudioStation/stream.cgi?${params2url(params)}`,
  {
    responseType: 'stream', //这里只能是arraybuffer，不能是json等其他项，blob也不行
    headers: {
        "Cookie" : cookie,
    }
  }).then(res => {
    response.set(res.headers) //把整个的响应头塞入更优雅一些
    res.data.pipe(response)
  })
})

app.get('/album_songs', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var album_name = request.query['album_name']? encodeURI(request.query['album_name']) : "";
  var album_artist_name = request.query['album_artist_name']? encodeURI(request.query['album_artist_name']) : "";
  var offset = request.query['offset']? encodeURI(request.query['offset']) : "";
  var limit = request.query['limit']? encodeURI(request.query['limit']) : "";
  var sId = request.query['sId']? encodeURI(request.query['sId']) : "";
  let params = {
    api: "SYNO.AudioStation.Song",
    version: "3",
    method: "list",
    library: "all",
    additional: "song_tag,song_audio,song_rating",
    offset: offset,
    album: album_name,
    album_artist: album_artist_name,
    limit: limit,
    _sid: sId
  };
  createRequest(
    '/webapi/AudioStation/song.cgi', 
    'POST', 
    params2url(params),
    cookie, 
    function(res) {
    response.setHeader("Content-Type", "application/json");
    response.send(res);
  });
});

app.get('/search_songs', function(request, response) {
  var offset = request.query['offset']? encodeURI(request.query['offset']) : "";
  var limit = request.query['limit']? encodeURI(request.query['limit']) : "";
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var keyword = request.query['keyword']? encodeURI(request.query['keyword']) : "";
  var sId = request.query['sId']? encodeURI(request.query['sId']) : "";
  let params = {
    api: "SYNO.AudioStation.Song",
    version: "1",
    method: "search",
    library: "all",
    additional: "song_tag,song_audio,song_rating",
    offset: offset,
    limit: limit,
    title: keyword,
    _sid: sId
  };
  createRequest(
    '/webapi/AudioStation/song.cgi', 
    'POST', 
    params2url(params),
    cookie, 
    function(res) {
    response.setHeader("Content-Type", "application/json");
    response.send(res);
  });
});



app.get('/getsongcover', function (request, response) {
  var id = request.query['id']? encodeURI(request.query['id']) : "";
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  let params = {
    api: "SYNO.AudioStation.Cover",
    version: "3",
    method: "getsongcover",
    library: "all",
    id: id,
  };
  axios.get(
  `http://magict.cn:5000/webapi/AudioStation/cover.cgi?${params2url(params)}`,
  {
    responseType: 'stream', //这里只能是arraybuffer，不能是json等其他项，blob也不行
    headers: {
        "Cookie" : cookie,
    }
  }).then(res => {
    response.set(res.headers) //把整个的响应头塞入更优雅一些
    res.data.pipe(response)
  })
})

app.get('/lyric', function (request, response) {
  var songid = request.query['songid']? encodeURI(request.query['songid']) : "";
  songid = "test";
  axios.get(
  `https://raw.staticdn.net/cdmfw/ds-lrc/main/${songid}.lrc`).then(res => {
    response.send(res.data);
  })
})

process.on('SIGHUP', function() {
  console.log('server: bye bye');
  process.exit();
});

module.exports = app;
