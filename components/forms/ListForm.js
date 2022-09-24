import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createList, updateList } from '../../api/listData';

const initialState = {
  name: '',
  description: '',
};

export default function ListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

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
      updateList(formInput).then(() => router.push('/lists'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createList(payload).then(() => {
        router.push('/lists');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <title>List Form</title>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} List</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="w-50">
        <Form.Control type="text" placeholder="List name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Description" className="w-50">
        <Form.Control type="text" placeholder="List description" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit" variant="secondary">{obj.firebaseKey ? 'Update' : 'Add'} List</Button>
    </Form>
  );
}

ListForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

ListForm.defaultProps = {
  obj: initialState,
};
