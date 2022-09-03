import React, { useEffect, useState } from 'react';
import { getManga } from '../api/mangaData';
import MangaCard from '../components/MangaCard';

export default function MangaPage() {
  const [manga, setManga] = useState([]);
  const getAllManga = () => {
    getManga().then(setManga);
  };
  useEffect(() => {
    getAllManga();
  }, []);

  return (
    <>
      {manga.map((volume) => (
        <MangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </>
  );
}
