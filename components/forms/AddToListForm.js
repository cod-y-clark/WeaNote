import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getLists } from '../../api/listData';
import { createUserListManga, updateUserListManga } from '../../api/userListMangaData';

const initialState = {
  title: '',
  author: '',
  image: '',
  reported: false,
};

function AddToListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [lists, setLists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

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
      const payload = { ...formInput, uid: user.uid };
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
            <option key={list.firebaseKey} value={list.firebaseKey} defaultValue={obj.list_id === list.firebaseKey}>
              {list.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Add to a' : 'Update'} List</Button>
    </Form>
  );
}

AddToListForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    reported: PropTypes.bool,
    list_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AddToListForm.defaultProps = {
  obj: initialState,
};

export default AddToListForm;
