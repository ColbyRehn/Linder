import React from 'react';
import Header from '../../Component/Header';
import './Profile.css'
import PreviewProfile from '../../Component/PreviewProfile'

function Profile() {
  const bio = JSON.parse(localStorage.getItem('bio') || '"Bob is bob"');
  const name = JSON.parse(localStorage.getItem('name') || '"Bob"');
  const img = JSON.parse(localStorage.getItem('img') ||  '""');

  return (
    <section id="profileinterface">
      <Header red="profile"/>
      <PreviewProfile />
    </section>
  );
}

export default Profile;
