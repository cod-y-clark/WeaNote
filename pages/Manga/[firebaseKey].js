import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MangaDetails from '../../components/details/MangaDetails';
import { getSingleManga } from '../../api/mangaData';

export default function ViewMangaDetails() {
  const [mangaDetails, setMangaDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleManga(firebaseKey).then(setMangaDetails);
  }, [firebaseKey]);

  return (
    <div>
      <MangaDetails
        key={mangaDetails.firebaseKey}
        mangaObj={mangaDetails}
      />
    </div>
  );
}
