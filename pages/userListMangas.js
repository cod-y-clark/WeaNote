/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getUserListManga } from '../api/userListMangaData';
import MangaCard from '../components/cards/MangaCard';
import { useAuth } from '../utils/context/authContext';

export default function Lists() {
  const [manga, setManga] = useState([]);
  const { user } = useAuth();

  const getAllUserListManga = () => {
    getUserListManga(user.uid).then(setManga);
  };

  useEffect(() => {
    getAllUserListManga();
  }, []);

  return (
    <>
      {manga.map((userListManga) => (
        <MangaCard key={userListManga.firebaseKey} mangaObj={userListManga} />
      ))}
    </>
  );
}
