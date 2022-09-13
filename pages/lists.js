/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getLists } from '../api/listData';
import ListCard from '../components/cards/ListCard';
import { useAuth } from '../utils/context/authContext';

export default function Lists() {
  const [lists, setLists] = useState([]);
  const { user } = useAuth();

  const getAllLists = () => {
    getLists(user.uid).then(setLists);
  };

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/list/new" passHref>
        <Button>Add A List</Button>
      </Link>

      <div className="d-flex flex-wrap">
        {lists.map((list) => (
          <ListCard key={list.firebaseKey} listObj={list} onUpdate={getAllLists} />
        ))}
      </div>
    </div>
  );
}
