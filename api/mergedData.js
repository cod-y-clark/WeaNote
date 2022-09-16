import { getSingleManga } from './mangaData';
import { getSingleUserListManga } from './userListMangaData';

const viewUserListManga = (userListMangaFirebaseKey) => new Promise((resolve, reject) => {
  getSingleUserListManga(userListMangaFirebaseKey)
    .then((userListMangaObject) => {
      getSingleManga(userListMangaObject.mangaId)
        .then((mangaObject) => {
          resolve({ mangaObject, ...userListMangaObject });
        });
    }).catch((error) => reject(error));
});

export default viewUserListManga;
