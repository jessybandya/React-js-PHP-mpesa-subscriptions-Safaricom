import React from 'react';
import FullHeader from '../../../components/Header'
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';
import './styles.css'


const Noauth = () => {
  return (
    <div>
    <FullHeader />

    <div className="landing-container">
      <header className="header">
        <h1 className="title">Welcome to M-Pesa Subscriptions</h1>
        <p className="subtitle">A convenient way to manage your subscriptions with ease.</p>
        <Link to="/login">
        <button className="get-started-button">Get Started</button>
        </Link>
      </header>
    </div>
      <Footer />
    </div>
  );
};

export default Noauth;
