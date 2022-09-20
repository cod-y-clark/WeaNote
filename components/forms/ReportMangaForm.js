import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getReportLists } from '../../api/reportListData';
import { getSingleManga } from '../../api/mangaData';
import createReportedManga from '../../api/reportedMangaData';

export default function ReportMangaForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [reportLists, setReportLists] = useState([]);
  const [manga, setManga] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleManga(firebaseKey).then(setManga);
  }, [firebaseKey]);

  useEffect(() => {
    getReportLists().then(setReportLists);

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
    const payload = { ...formInput, ...manga };
    createReportedManga(payload).then(() => {
      router.push('/mangas');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingSelect" label="">
        <Form.Select aria-label="ReportList" name="reportListId" defaultValue="0" onChange={handleChange} className="mb-3" required>
          <option value="">Why are you reporting this manga?</option>
          {reportLists.map((reportList) => (
            <option key={reportList.firebaseKey} value={reportList.firebaseKey} defaultValue={obj.reportListId === reportList.firebaseKey}>
              {reportList.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <Button type="submit" variant="danger">Report</Button>
    </Form>
  );
}

ReportMangaForm.propTypes = {
  obj: PropTypes.shape({
    reportListId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ReportMangaForm.defaultProps = {
  obj: {
    reportListId: '',
  },
};
