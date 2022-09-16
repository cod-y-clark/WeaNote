import React, { useEffect, useState } from 'react';
import viewUserListManga from '../../api/mergedData';
import MangaCard from '../cards/MangaCard';

export default function ListDetails() {
  const [userListManga, setUserListManga] = useState([]);

  const getAllUserListManga = () => {
    viewUserListManga(userListManga.listId).then(setUserListManga);
  };

  useEffect(() => {
    getAllUserListManga();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userListManga.map((volume) => (
        <MangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </>
  );
}
