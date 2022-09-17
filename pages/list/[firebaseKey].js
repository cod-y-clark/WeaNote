/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getListManga } from '../../api/listData';
import UserListMangaCard from '../../components/cards/UserListMangaCard';

export default function ViewListDetails() {
  const [listDetails, setListDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAllUserListManga = () => {
    getListManga(firebaseKey).then(setListDetails);
  };

  useEffect(() => {
    getAllUserListManga();
  }, [firebaseKey]);

  return (
    <div>
      {listDetails.map((volume) => (
        <UserListMangaCard key={volume.firebaseKey} mangaObj={volume} onUpdate={getAllUserListManga} />
      ))}
    </div>
  );
}
