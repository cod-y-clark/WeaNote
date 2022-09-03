import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function MangaCard({
  image, title, author, firebaseKey,
}) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={image} alt={title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>by {author}</Card.Text>
        <Link href={`Items/${firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

MangaCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

MangaCard.defaultProps = {
  image: 'https://static.thenounproject.com/png/340719-200.png',
};
