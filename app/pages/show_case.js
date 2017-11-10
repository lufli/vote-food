import React, { Component } from 'react';
import Header from '../components/header';

function ShowCase() {
  return (
    <div>
      <Header />
      <div>
        <p>ahahahaha</p>
        <input type="text"></input>
        <button className="btn-primary">Submit</button>
        <button className="btn">Cancle</button>
        <button className="btn-danger">Danger</button>
      </div>
    </div>
  )
}

export default ShowCase;