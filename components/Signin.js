/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column align-content-center"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>
        Image Here
      </h1>
      <Button type="button" className="btn btn-dark btn-sm copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
