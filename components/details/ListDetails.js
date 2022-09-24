/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import UserListMangaCard from '../cards/UserListMangaCard';

export default function ListDetails({ listArr }) {
  return (
    <>
      {listArr.map((volume) => (
        <UserListMangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </>
  );
}
