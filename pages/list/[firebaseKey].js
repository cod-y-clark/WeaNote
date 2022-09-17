import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getListManga } from '../../api/listData';
import MangaCard from '../../components/cards/MangaCard';

export default function ViewListDetails() {
  const [listDetails, setListDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getListManga(firebaseKey).then(setListDetails);
  }, [firebaseKey]);
  return (
    <div>
      {listDetails.map((volume) => (
        <MangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </div>
  );
}
