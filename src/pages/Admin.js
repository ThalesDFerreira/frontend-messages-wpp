import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Admin.css';

const Admin = () => {
  return (
    <div className='container-admin flex flex-col min-h-screen'>
      <Header />
      <main className='p-2 flex-grow bg-rgb-212-212-212'>
        <p>Page Admin</p>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
