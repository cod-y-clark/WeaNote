/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddToListForm from '../forms/AddToListForm';
import ReportMangaForm from '../forms/ReportMangaForm';

export default function MangaDetails({ mangaObj }) {
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
      <Col>
        <div>
          <AddToListForm />
        </div>
        <div>
          <ReportMangaForm />
        </div>
      </Col>
    </div>
  );
}

MangaDetails.propTypes = {
  mangaObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
