import { getManga } from './mangaData';
import { getUserListManga } from './userListMangaData';

const viewUserListManga = (uid) => new Promise((resolve, reject) => {
  getUserListManga(uid)
    .then((userListMangaObject) => {
      getManga(userListMangaObject.mangaId)
        .then((mangaObject) => {
          resolve({ mangaObject, ...userListMangaObject });
        });
    }).catch((error) => reject(error));
});

export default viewUserListManga;
