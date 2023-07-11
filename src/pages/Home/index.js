import React from 'react';
import './styles.css';
import FullHeader from '../../components/Header'
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Auth from './Auth';
import Noauth from './No-Auth';


function Home(){
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Retrieve user details from session storage
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
     {user === null ? <Noauth /> : <Auth />}
    </div>
  );
};

export default Home;
