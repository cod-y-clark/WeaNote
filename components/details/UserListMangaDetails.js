/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { deleteUserListManga } from '../../api/userListMangaData';

export default function UserListMangaDetails({ mangaObj, onUpdate }) {
  const deleteThisUserListManga = () => {
    if (window.confirm('Remove from list?')) {
      deleteUserListManga(mangaObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={mangaObj.image} alt={mangaObj.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {mangaObj.title} by {mangaObj.author}
        </h5>
      </div>
      <Button variant="danger" onClick={deleteThisUserListManga} className="m-2">
        Remove from list
      </Button>
    </div>
  );
}

UserListMangaDetails.propTypes = {
  mangaObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    note: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
