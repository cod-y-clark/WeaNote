import { deleteList, getListManga } from './listData';
import { getManga } from './mangaData';
import { deleteUserListManga, getUserListManga } from './userListMangaData';

const viewUserListManga = (uid) => new Promise((resolve, reject) => {
  getUserListManga(uid)
    .then((userListMangaObject) => {
      getManga(userListMangaObject.mangaId)
        .then((mangaObject) => {
          resolve({ mangaObject, ...userListMangaObject });
        });
    }).catch((error) => reject(error));
});

const deleteListManga = (listId) => new Promise((resolve, reject) => {
  getListManga(listId).then((mangaArray) => {
    const deleteMangaPromises = mangaArray.map((manga) => deleteUserListManga(manga.firebaseKey));

    Promise.all(deleteMangaPromises).then(() => {
      deleteList(listId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewUserListManga, deleteListManga };
