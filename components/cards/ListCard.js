import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteListManga } from '../../api/mergedData';

export default function ListCard({ listObj, onUpdate }) {
  const deleteThisList = () => {
    if (window.confirm('Delete this list?')) {
      deleteListManga(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>
          <a href={`list/${listObj.firebaseKey}`}>{listObj.name}</a>
        </Card.Title>
        <p className="card-text bold">{listObj.description}</p>

        <Link href={`/list/edit/${listObj.firebaseKey}`} passHref>
          <Button className="btn btn-secondary btn-sm copy-btn">Edit</Button>
        </Link>

        <Button onClick={deleteThisList} className="btn-sm btn-secondary">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

ListCard.propTypes = {
  listObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
