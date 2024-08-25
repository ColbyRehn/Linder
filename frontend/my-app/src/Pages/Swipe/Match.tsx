import React from 'react';
import './Match.css'
import match from '../../Assets/match.gif'
import { useNavigate } from "react-router-dom";

function Match() {
  const navigate = useNavigate();
  const restart = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <section id="MatchInterface">
      <img style={{height: 300, width: 300, objectFit: 'contain'}} src={match} />
      <p style={{width: 700, textAlign: 'center'}}>It's a Match. You're exactly the face they've been looking for.  Your expression just expressed itself into a job.</p>
      <button id="nextMatch" onClick={() => restart()}>RESTART</button>
    </section>
  );
}

export default Match;