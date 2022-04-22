import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserInformation from './UserInformation';

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<UserInformation />} />
      </Routes>
    </section>
  );
};

export default User;
