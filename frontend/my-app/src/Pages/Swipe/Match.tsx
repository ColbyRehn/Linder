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
  const name = localStorage.getItem('boss_name');
  const img = localStorage.getItem('boss_image') || "";
  return (
    <section id="MatchInterface">
      <img style={{height: 300, width: 300, objectFit: 'contain'}} src={match} />
      <img style={{height: 180, width: 180, borderRadius: 200}} src={img}  />
      <p style={{fontSize: 28, fontWeight: 'bold'}}>{name}</p>
      <p style={{width: 700, textAlign: 'center'}}>It's a Match. You're exactly the face they've been looking for.  Your expression just expressed itself into a job.</p>
      <button id="nextMatch" onClick={() => restart()}>RESTART</button>
    </section>
  );
}

export default Match;