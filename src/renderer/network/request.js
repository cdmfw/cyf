import axios from '../utils/request'
const request = axios


export function login_in()
  { return request( { url: '/loginIn' } ) }

export function all_album()  { 
    return request( { url: '/allAlbum' } ) 
}

export function album_songs(album_name,album_artist_name,sId) {
    return request( { url: '/album_songs', params: {
        offset: 0,
        limit: 50000,
        album_name,
        album_artist_name,
        sId
    }});
}

export function search( keyword, offset, limit , type) {
    return request( { url: '/search_songs', params: {
        offset,
        limit,
        keyword
    }});
}

export function lyric(songid) {
    return request( { url: '/lyric', params: {
        songid
    }});
}

export function like(id, like = true) {
  return request( { url: '/like', params: { id, like } } )
}

export function playlist_option() {
    return ;
}