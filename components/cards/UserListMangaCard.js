import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function UserListMangaCard({ mangaObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={mangaObj.image} alt={mangaObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{mangaObj.title}</Card.Title>
        <Card.Text>by {mangaObj.author}</Card.Text>
        <Link href={`manga/${mangaObj.firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

UserListMangaCard.propTypes = {
  mangaObj: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    reported: PropTypes.bool,
    listId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
