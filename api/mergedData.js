import { getSingleManga } from './mangaData';

const viewMangaDetails = (mangaFirebaseKey) => new Promise((resolve, reject) => {
  getSingleManga(mangaFirebaseKey)
    .then((mangaObject) => resolve({ ...mangaObject }))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { viewMangaDetails };
