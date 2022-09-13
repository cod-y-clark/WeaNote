import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { viewMangaDetails } from '../../api/mergedData';

export default function ViewManga() {
  const [mangaDetails, setMangaDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewMangaDetails(firebaseKey).then(setMangaDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={mangaDetails.image} alt={mangaDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {mangaDetails.title} by {mangaDetails.author}
        </h5>
      </div>
    </div>
  );
}
