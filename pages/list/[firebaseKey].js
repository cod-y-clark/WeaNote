import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListDetails from '../../components/details/ListDetails';
import { getSingleList } from '../../api/listData';

export default function ViewListDetails() {
  const [listDetails, setListDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleList(firebaseKey).then(setListDetails);
  }, [firebaseKey]);

  return (
    <div>
      <ListDetails
        key={listDetails.firebaseKey}
        listObj={listDetails}
      />
    </div>
  );
}
