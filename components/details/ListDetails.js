import React, { useEffect, useState } from 'react';
import getUserListMangaDetails from '../../api/mergedData';
import MangaCard from '../cards/MangaCard';
import { useAuth } from '../../utils/context/authContext';

export default function ListDetails() {
  const [userListManga, setUserListManga] = useState([]);
  const { user } = useAuth();

  const getAllUserListManga = () => {
    getUserListMangaDetails(user.uid).then(setUserListManga);
  };

  useEffect(() => {
    getAllUserListManga();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Object.keys(userListManga).map((volume) => (
        <MangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </>
  );
}
