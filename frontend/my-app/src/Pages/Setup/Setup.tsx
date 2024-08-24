import React from 'react';
import './Setup.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Setup() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  return (
    <section id="Interface">
      <div className='Input'>
        <p>Name:</p>
        <input onChange={(e)=>{setName(e.target.value)}}/>
      </div>
      <div className='Input'>
        <p>Role:</p>
        <input onChange={(e)=>{setRole(e.target.value)}}/>
      </div>
      <button onClick={() => navigate("/photo", { state: { name, role } })}>Next</button>
    </section>
  );
}

export default Setup;
