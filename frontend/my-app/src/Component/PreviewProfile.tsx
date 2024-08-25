import React from 'react';
import './PreviewProfile.css'
import logoBig from '../Assets/tinkedLogoLarge.png'

function PreviewProfile() {
  const bio = JSON.parse(localStorage.getItem('bio') || '"Bob is bob"');
  const name = JSON.parse(localStorage.getItem('name') || '"Bob"');
  const img = JSON.parse(localStorage.getItem('img') ||  '""');

  return (
    <section id="previewprofileinterface">
      <img src={logoBig} style={{ marginTop: 50, height: 50, width: 200, objectFit: "contain", margin: 24 }} />
      <img style={{height: 180, width: 180, borderRadius: 200}} src={img}  /> 
      <p style={{fontSize: 28, fontWeight: 'bold'}}>{name}</p>
      <p style={{marginTop: 48}}>{bio}</p>
    </section>
  );
}

export default PreviewProfile;