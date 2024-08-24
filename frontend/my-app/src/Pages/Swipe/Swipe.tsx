import React from 'react';
import Header from '../../Component/Header';
import Employer from '../../Component/Employer';
import './Swipe.css'

function Swipe() {
  return (
    <section id="SwipeInterface">
      <Header />
      <div id="CardContainer">
        <Employer />
      </div>
    </section>
  );
}

export default Swipe;
