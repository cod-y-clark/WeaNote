import React, { useEffect, useState } from 'react';
import { getManga } from '../api/mangaData';
import MangaCard from '../components/cards/MangaCard';

export default function Manga() {
  const [manga, setManga] = useState([]);

  const getAllManga = () => {
    getManga().then(setManga);
  };

  useEffect(() => {
    getAllManga();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {manga.map((volume) => (
        <MangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </div>
  );
}
