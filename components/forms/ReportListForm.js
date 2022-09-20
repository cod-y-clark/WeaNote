import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createReportList } from '../../api/reportListData';

const initialState = {
  name: '',
};

export default function ReportListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    createReportList(payload).then(() => {
      router.push('/reportLists');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <title>Report List Form</title>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Report List</h2>

      <FloatingLabel controlId="floatingInput1" label="Report list name" className="mb-3">
        <Form.Control type="text" placeholder="Report list name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} List</Button>
    </Form>
  );
}

ReportListForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
  }),
};

ReportListForm.defaultProps = {
  obj: initialState,
};
