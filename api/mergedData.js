import { getManga } from './mangaData';
import { getUserListManga } from './userListMangaData';

const getUserListMangaDetails = (uid) => new Promise((resolve, reject) => {
  getUserListManga(uid)
    .then(([userListMangaObject]) => {
      getManga(userListMangaObject.mangaId)
        .then((mangaObject) => {
          resolve({ mangaId: mangaObject, ...userListMangaObject });
          console.log(mangaObject);
        });
    }).catch((error) => reject(error));
});

// const getUserListMangaDetails = (uid) => new Promise((resolve, reject) => {
//   getUserListManga(uid).then((userListMangaObject) => {
//     Promise.all([getManga(userListMangaObject.mangaId)]).then(([mangaForUserList]) => {
//       resolve({
//         ...userListMangaObject,
//         mangaId: mangaForUserList,
//       });
//       console.log(mangaForUserList);
//     });
//   }).catch((error) => reject(error));
// });

// const getUserListMangaDetails = (uid) => new Promise((resolve, reject) => {
//   getUserListManga(uid)
//     .then((mangaArr) => {
//       const getMangaForListManga = mangaArr.map(
//         (listMangaObj) => getSingleManga(listMangaObj.mangaId)
//           .then((mangaObj) => ({ ...listMangaObj, userListManga:  })),
//       );
//       Promise.all(getMangaForListManga).then(resolve);
//     }).catch(reject);
// });

// const getUserListMangaDetails = (mangaFirebaseKey, uid) => new Promise((resolve, reject) => {
//   Promise.all([getSingleManga(mangaFirebaseKey), getUserListManga(uid)])
//     .then(([mangaObject, mangaArray]) => {
//       resolve({ ...mangaObject, userListManga: mangaArray });
//     }).catch((error) => reject(error));
// });

// export default viewUserListManga;
export default getUserListMangaDetails;
