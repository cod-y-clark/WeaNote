import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteUserListManga } from '../../api/userListMangaData';

export default function UserListMangaCard({ mangaObj, onUpdate }) {
  const deleteThisUserListManga = () => {
    if (window.confirm('Remove from list?')) {
      deleteUserListManga(mangaObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={mangaObj.image} alt={mangaObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{mangaObj.title}</Card.Title>
        <Card.Text>by {mangaObj.author}</Card.Text>
        <Link href={`userListMangas/${mangaObj.firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisUserListManga} className="m-2">
          Remove from list
        </Button>
      </Card.Body>
    </Card>
  );
}

UserListMangaCard.propTypes = {
  mangaObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    reported: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
