import React, { useEffect, useState } from 'react';
import FullHeader from '../../../components/Header'
import Footer from '../../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';


const Auth = () => {
    const [user, setUser] = useState(null);
    const history = useNavigate();

    useEffect(() => {
      // Retrieve user details from session storage
      const storedUser = sessionStorage.getItem('user');
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

      
      const performLogout = () => {     
        // Redirect to login page
        history('/pricing');
      
        // Show subscription status message
        Swal.fire({
          icon: 'info',
          title: 'Subscription Status',
          text: `Your subscription of ${user?.subscription_type} Plan has expired.`,
        });
      };


    const updateSubscriptionStatus = (email, newSubscriptionStatus) => {
        fetch('https://electrikacomputers.co.ke/backend/php/sub/check_update_status.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${email}&subscriptionStatus=${newSubscriptionStatus}`,
        })
          .then(response => response.text())
          .then(data => {
            console.log(data);
            performLogout()
            // Handle the response as needed
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle the error
          });
      };
  

      useEffect(() => {
        const timestamp = user?.created_at; // Replace with your timestamp value
      
        const checkTimestamp = () => {
          const currentTime = moment();
          const timestampMoment = moment(parseInt(timestamp));
          const timeDifference = currentTime.diff(timestampMoment, 'days');
      
          if (timeDifference > 30) {
            if (user?.subscription_type === 'normal') {
              console.log('I have no problem with this user');
            } else {
              updateSubscriptionStatus(user?.email, '0');
            }
      
            // Stop the timer by clearing the interval
            clearInterval(interval);
          } else {
            console.log('The timestamp is less than 30 days');
          }
        };
      
        // Start the interval to check the timestamp every 1 second
        const interval = setInterval(checkTimestamp, 1000);
      
        // Cleanup function to clear the interval when the component unmounts
        return () => {
          clearInterval(interval);
        };
      }, [user]);

//   console.log(currentUserId)
//   console.log(currentUserType)
//   console.log(currentUserCreatedAt)
  return (

    <div>
    <FullHeader />

    <div className="landing-container">
      <header className="header">
        <h1 className="title">Welcome to M-Pesa Subscriptions</h1>
        <p className="subtitle">A convenient way to manage your subscriptions with ease.</p>
        <button className="get-started-button">{user?.subscription_type === 'normal' ? <span>{user?.subscription_type} Plan</span> : <span>{user?.subscription_type} Plan</span>}</button>
      </header>
    </div>
      <Footer />
    </div>
  );
};

export default Auth;
