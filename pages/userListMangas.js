/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getUserListManga } from '../api/userListMangaData';
import { useAuth } from '../utils/context/authContext';
import UserListMangaCard from '../components/cards/UserListMangaCard';

export default function UserListManga() {
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
      {manga.map((volume) => (
        <UserListMangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </>
  );
}
