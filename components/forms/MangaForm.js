import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createManga, updateManga } from '../../api/mangaData';

const initialState = {
  image: '',
  title: '',
  author: '',
  reported: false,
};

export default function MangaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateManga(formInput).then(() => router.push('/mangas'));
    } else {
      const payload = { ...formInput };
      createManga(payload).then(() => {
        router.push('/mangas');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <title>Manga Form</title>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Manga</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control type="text" placeholder="Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Author" className="mb-3">
        <Form.Control type="text" placeholder="Author" name="author" value={formInput.author} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="text" placeholder="Image URL" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Manga</Button>
    </Form>
  );
}

MangaForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string,
    reported: PropTypes.bool,
  }),
};

MangaForm.defaultProps = {
  obj: initialState,
};
