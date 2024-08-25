import React from 'react';
import Header from '../../Component/Header';
import './Profile.css'
import PreviewProfile from '../../Component/PreviewProfile'

function Profile() {
  return (
    <section id="profileinterface">
      <Header red="profile"/>
      <PreviewProfile />
    </section>
  );
}

export default Profile;
