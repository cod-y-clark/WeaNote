import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getLists } from '../../api/listData';
import { getSingleManga } from '../../api/mangaData';
import { createUserListManga, updateUserListManga } from '../../api/userListMangaData';

export default function AddToListForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [lists, setLists] = useState([]);
  const [manga, setManga] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleManga(firebaseKey).then(setManga);
  }, [firebaseKey]);

  useEffect(() => {
    getLists(user.uid).then(setLists);

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
      updateUserListManga(formInput).then(() => router.push(`/userListMangas/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, firebaseKey: manga.firebaseKey };
      createUserListManga(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingSelect" label="">
        <Form.Select aria-label="List" name="list_id" defaultValue="0" onChange={handleChange} className="mb-3" required>
          <option value="">Select a List</option>
          {lists.map((list) => (
            <option key={list.firebaseKey} value={list.firebaseKey} defaultValue={obj.listId === list.firebaseKey}>
              {list.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <Button type="submit">Add to a List</Button>
    </Form>
  );
}

AddToListForm.propTypes = {
  obj: PropTypes.shape({
    mangaId: PropTypes.string,
    listId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AddToListForm.defaultProps = {
  obj: {
    mangaId: '',
    listId: '',
  },
};
