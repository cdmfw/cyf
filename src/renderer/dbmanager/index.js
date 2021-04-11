import Dexie from "dexie";

class DexieDBManager {
    orderdb;
    static VERSION_1_O  = 1;
    constructor() {
      this.init();
    }
    init() {
      this.orderdb = new Dexie('orderdb', { autoOpen: true });
  
      this.orderdb.version(DexieDBManager.VERSION_1_O).stores({
        album: '&name, album_artist, artist, display_artist, year ',
        song: '&id, title, artist, [album+album_artist], duration, path, filesize',
      });
      console.log("database initialized");
    }

    getTable(schema) {
      return this.orderdb.table(schema);
    }

    async clearTable(schema) {
      const table = this.getTable(schema);
      return await table.clear();
    }

    async add(schema,data) {
      const table = this.getTable(schema);
      return await table.add(data);
    }

    async bulkAdd(schema,datas) {
      const table = this.getTable(schema);
      return await table.bulkAdd(datas);
    }

    async loadDbData() {
      const albumTable = this.getTable('album');
      let album = await albumTable.toArray();
      const songTable = this.getTable('song');
      for(let i=0;i<album.length;i++) {
        let songs = await songTable.where({
          album: album[i].name,
          album_artist: album[i].album_artist
        }).toArray();

        album[i].songs = songs.map((song,index) => {
          return {
            "__index": index+1,
            "id": song.id,
            "name":song.title,
            "artists":[{
              "name": song.artist
            }],
            "album":{
              "id": song.album,
              "name": song.album,
            },
            "duration": song.duration,
          }
        });
      }
      return {album:album};
    }

    async deleteSongs(album,album_artist) {
      const songTable = this.getTable("song");
      await songTable.where({
          album: album,
          album_artist: album_artist
        }).delete();
    }
}

export default new DexieDBManager();