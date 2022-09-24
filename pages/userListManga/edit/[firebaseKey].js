import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUserListManga } from '../../../api/userListMangaData';
import AddToListForm from '../../../components/forms/AddToListForm';

export default function EditMangaList() {
  const [editManga, setEditManga] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUserListManga(firebaseKey).then(setEditManga);
  }, [firebaseKey]);

  return <AddToListForm obj={editManga} />;
}
