import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function MangaCard({ mangaObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={mangaObj.image} alt={mangaObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{mangaObj.title}</Card.Title>
        <Card.Text>by {mangaObj.author}</Card.Text>
        <Link href={`/manga/${mangaObj.firebaseKey}`} passHref>
          <Button variant="secondary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

MangaCard.propTypes = {
  mangaObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
