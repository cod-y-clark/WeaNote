/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import MangaCard from '../cards/MangaCard';

export default function ListDetails({ listArr }) {
  return (
    <>
      {listArr.map((volume) => (
        <MangaCard key={volume.firebaseKey} mangaObj={volume} />
      ))}
    </>
  );
}
