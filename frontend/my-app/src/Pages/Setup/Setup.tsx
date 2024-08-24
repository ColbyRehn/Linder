import React from 'react';
import './Setup.css'
import { useNavigate } from "react-router-dom";

function Setup() {
  const navigate = useNavigate();
  return (
    <section id="Interface">
      <div className='Input'>
        <p>Name:</p>
        <input />
      </div>
      <div className='Input'>
        <p>Role:</p>
        <input />
      </div>
      <button onClick={() => navigate("/photo")}>Next</button>
    </section>
  );
}

export default Setup;
