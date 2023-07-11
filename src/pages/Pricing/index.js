import React, { useEffect, useState } from 'react'
import FullHeader from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from 'react-bootstrap/Modal';

function Pricing() {
  const [user, setUser] = useState(null);
  const history = useNavigate();
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [initiatedMerchantRequestID , setInitiatedMerchantRequestID] = useState('');
  const [initiatedCheckoutRequestID , setInitiatedCheckoutRequestID] = useState('');
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => setShow(false);

  const handleModalShow = (plan, amount) => {
    setShow(true);
    setPlan(plan);
    setAmount(amount);
  };

  useEffect(() => {
    // Retrieve user details from session storage
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!phoneNumber){
      toast.error("Please enter phone number", {
        position: "bottom-center",
      });
      setLoading(false);
    }else{
      try {
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("phoneNumber", phoneNumber);
        // Make a request to the backend server to initiate STK push
        setLoading(true);
        const response = await axios.post(
<<<<<<< HEAD
          "/initiator.php", //Check this from the last Till No paynment backend
=======
          "backend/initiator.php",
>>>>>>> 23cba958331cd016478406f558c014303a1e69e2
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(false);
  
        // Handle the response from the server
        const { success, message, transactionID, checkoutRequestID } = response.data;
          setInitiatedMerchantRequestID(transactionID);
         setInitiatedCheckoutRequestID(checkoutRequestID);
        if (success) {
          // Display success message to the user
          toast.success(message, {
            position: "top-center",
          });
          setOpen(true)
        }else{
          toast.error(message, {
            position: "bottom-center",
          });
        }
        
      } catch (error) {
        console.error(error);
        // Handle the error and display an error message to the user
        toast.error("An error occurred. Please try again later.",{
          position: "bottom-center",
        });
      }
    }
  };

  

  useEffect(() => {
    let swalDisplayed = false; // Flag to track if Swal modal has been displayed
  
    const fetchData = () => {
<<<<<<< HEAD
      fetch(`backend/callback.php`)   //Check this from the last Till No paynment backend
=======
      fetch(`backend/callback.php`)
>>>>>>> 23cba958331cd016478406f558c014303a1e69e2
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
          }
          return response.json();
        })
        .then((data) => {
          const actualData = data.MpesaResponse;
  
          const jsonObjects = actualData.split('}{');
  
          let matchingPaymentStatus = null;
  
          jsonObjects.forEach((json, index) => {
            const jsonString =
              index === 0
                ? json + '}'
                : index === jsonObjects.length - 1
                ? '{' + json
                : '{' + json + '}';
  
            const parsedData = JSON.parse(jsonString);
            const merchantRequestID =
              parsedData.Body.stkCallback.MerchantRequestID;
            const resultCode = parsedData.Body.stkCallback.ResultCode;
  
            if (merchantRequestID === initiatedMerchantRequestID) {
              if (
                resultCode === 0 &&
                parsedData.Body.stkCallback.CallbackMetadata &&
                parsedData.Body.stkCallback.CallbackMetadata.Item
              ) {
                const items = parsedData.Body.stkCallback.CallbackMetadata.Item;
  
                matchingPaymentStatus = {
                  resultCode,
                  resultDesc: parsedData.Body.stkCallback.ResultDesc,
                  items,
                };
              } else {
                matchingPaymentStatus = {
                  resultCode,
                  resultDesc: parsedData.Body.stkCallback.ResultDesc,
                  items: [],
                };
              }
            }
          });
  
          // Show Swal modal based on the matching payment status if not displayed before
          if (matchingPaymentStatus && !swalDisplayed) {
            swalDisplayed = true; // Set flag to true
  
            if (
              matchingPaymentStatus.resultCode === 0 &&
              matchingPaymentStatus.items.length > 0
            ) {
              // Show success Swal modal with data
              setOpen(false)
              updateSubscriptionStatus(user?.email,plan)
            } else {
              // Show error Swal modal
              setOpen(false)
              Swal.fire({
                icon: 'error',
                title: 'Transaction Failed',
                text: `${matchingPaymentStatus.resultDesc}`,
              })
            }
          }
        })
        .catch((error) => {
          console.error(error);
          setMessage('An error occurred while checking for M-Pesa updates.');
        });
    };
  
    const interval = setInterval(fetchData, 1000);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [initiatedMerchantRequestID, initiatedCheckoutRequestID]);

  const updateSubscriptionStatus = (email, newSubscriptionType) => {
    const created_at = Date.now();
    fetch('backend/update_subscription_type.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&newSubscriptionType=${newSubscriptionType}&created_at=${created_at}`,
    })
      .then(response => response.text())
      .then(data => {
        localStorage.removeItem('token');
        localStorage.removeItem('authId');
        sessionStorage.removeItem('user');
      
        // Redirect to login page
        history('/login');

        Swal.fire({
          icon: 'success',
          title: 'Subscription Status',
          text: `Your subscription has been updated to "${plan} Plan" successfully.\nRequired to login!`,
        })
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Subscription Status',
          text: `An error occurred while updating your subscription.\n${error}`,
        })
      
  })
}



const checkLogin = () =>{
   history('/login')

   Swal.fire({
    icon: 'info',
    title: 'Subscription Status',
    text: `You need to login to access this page.`,
   })
}



  return (
    <div>
    <FullHeader />

    <div style={{marginTop:20,marginBottom:-60}} className="container">
    <div style={{justifyContent:'space-between'}} className="row">
    {user?.subscription_type !== 'normal' && (
      <div className="col-md-6 col-lg-3">
        <div className="pricing pricing-warning">
          <div className="title"><a >Basic</a></div>
          <div className="price-box">
            <div className="icon pull-right border circle">
              <span className="livicon livicon-processed" data-n="shopping-cart" data-s={32} data-c="#1e1e1e" data-hc={0} id="livicon-1" style={{width: '32px', height: '32px'}}><svg height={32} version="1.1" width={32} xmlns="http://www.w3.org/2000/svg" style={{overflow: 'hidden', position: 'relative', top: '-0.15625px'}} id="canvas-for-livicon-1"><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël 2.1.2</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#1e1e1e" stroke="none" d="M9.428,19C9.192,19,9,18.792,9,18.536V14.9H12.1V19H9.428ZM17,18.536V14.9H12.9V19H16.571C16.808,19,17,18.792,17,18.536ZM9.428,11C9.192,11,9,11.191,9,11.429V14.1H12.1V11H9.428ZM16.571,11H12.9V14.1H17V11.429C17,11.191,16.809,11,16.571,11Z" transform="matrix(1,0,0,1,-5,-20)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#1e1e1e" stroke="none" d="M18.428,19C18.191,19,18,18.792,18,18.536V14.9H21.1V19H18.428ZM26,18.536V14.9H21.9V19H25.570999999999998C25.808,19,26,18.792,26,18.536ZM18.428,11C18.191,11,18,11.191,18,11.429V14.1H21.1V11H18.428ZM25.571,11H21.9V14.1H26V11.429C26,11.191,25.809,11,25.571,11Z" transform="matrix(1,0,0,1,5,-20)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#1e1e1e" stroke="none" d="M11.156,11C10.921000000000001,11,10.729000000000001,10.792,10.729000000000001,10.537V6.369H14.651000000000002V11H11.156ZM19.287,10.537V6.369H15.364999999999998V11H18.857999999999997C19.095,11,19.287,10.792,19.287,10.537ZM13.406,1.145C13.081000000000001,0.998,12.421000000000001,0.929,11.979000000000001,1.145C11.508000000000001,1.3760000000000001,11.129000000000001,1.956,11.266000000000002,2.5709999999999997C11.482000000000001,3.545,12.868000000000002,3.872,12.868000000000002,3.872H10.443000000000001C10.207,3.872,10.016000000000002,4.063,10.016000000000002,4.2989999999999995V6.010999999999999H14.651000000000002V3.873H15.008000000000001C15.008,3.873,14.54,1.657,13.406,1.145ZM12.835,3.253C12.548,3.194,12.048,3.067,11.926,2.515C11.849,2.165,12.063,1.836,12.331,1.705C12.581999999999999,1.582,12.956999999999999,1.622,13.142,1.705C13.785,1.995,14.049999999999999,3.253,14.049999999999999,3.253S13.358,3.359,12.835,3.253ZM19.572,3.873H17.146C17.146,3.873,18.533,3.5460000000000003,18.75,2.572C18.886,1.956,18.507,1.377,18.036,1.1460000000000001C17.594,0.9300000000000002,16.934,0.9990000000000001,16.609,1.1460000000000001C15.475000000000001,1.6580000000000001,15.007000000000001,3.8740000000000006,15.007000000000001,3.8740000000000006H15.364V6.013H20V4.3C20,4.063,19.81,3.873,19.572,3.873ZM15.966,3.253C15.966,3.253,16.232,1.995,16.874,1.705C17.06,1.622,17.433999999999997,1.582,17.685,1.705C17.951999999999998,1.836,18.166,2.164,18.087999999999997,2.515C17.965999999999998,3.068,17.467,3.1950000000000003,17.179999999999996,3.253C16.657,3.359,15.966,3.253,15.966,3.253Z" transform="matrix(1,0,0,1,2,-20)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#1e1e1e" stroke="none" d="M14,27C14,28.105,13.104,29,12,29S10,28.105,10,27S10.896,25,12,25S14,25.895,14,27ZM24,25C22.895,25,22,25.895,22,27S22.895,29,24,29S26,28.105,26,27S25.105,25,24,25ZM26.713,22.586L26.529,23.413999999999998C26.457,23.737,26.13,24,25.799,24H9.3C8.637,24,7.998000000000001,23.473,7.873000000000001,22.821L4.75,6.59C4.69,6.264,4.373,6,4.042,6H1.334C0.782,6,0.3340000000000001,5.552,0.3340000000000001,5S0.782,4,1.334,4H5.334C5.997,4,6.622,4.53,6.73,5.184L7.193,8H29.4C29.730999999999998,8,29.941,8.262,29.869999999999997,8.586L27.464,19.414C27.393,19.737,27.065,20,26.734,20H9.3L9.554,21.409C9.612,21.735,9.929,22,10.26,22H26.244C26.575,22,26.785,22.263,26.713,22.586ZM26.939,13H8.078L8.447,15H26.494L26.939,13ZM7.524,10L7.893,12H27.161L27.605,10H7.524ZM25.828,18L26.272,16H8.631L9,18H25.828Z" opacity={1} transform="matrix(1,0,0,1,0,0)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 1}} /></svg></span>
            </div>
            <div className="starting">Starting at</div>
            <div className="price">Free<span>/month</span></div>
          </div>
          <ul className="options">
            <li><span><i className="fa fa-check" /></span>Responsive Design
            </li>
            <li className="active"><span><i className="fa fa-check" /></span>Styled elements
            </li>
            <li><span><i className="fa fa-check" /></span>Easy Setup
            </li>
          </ul>
          <div className="bottom-box">
            <a className="more">Read More <span className="fa fa-angle-right" /></a>
            <div className="rating-box">
              <div style={{width: '60%'}} className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="73px" height="12px" viewBox="0 0 73 12" enable-fwb-bg="new 0 0 73 12" xmlSpace="preserve">
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="6.5,0 8,5 13,5 9,7.7 10,12 6.5,9.2 3,12 4,7.7 0,5 5,5" />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="66.5,0 68,5 73,5 69,7.7 70,12 66.5,9.2 63,12 64,7.7 60,5 65,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="21.5,0 23,5 28,5 24,7.7 25,12 21.5,9.2 18,12 19,7.7 15,5 20,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="51.5,0 53,5 58,5 54,7.7 55,12 51.5,9.2 48,12 49,7.7 45,5 50,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="36.5,0 38,5 43,5 39,7.7 40,12 36.5,9.2 33,12 34,7.7 30,5 35,5 " />
                </svg>
              </div>
            </div>
            {user === null ? (
              <a onClick={checkLogin}  style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>  
            ):(
              <a onClick={() => updateSubscriptionStatus(user?.email,'normal')} style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>    
            )}
          </div>
        </div>
      </div>
    )}


      <div className="col-md-6 col-lg-3">
        <div className="pricing-info pricing">
          <div className="title"><a >VIP</a></div>
          <div className="price-box">
            <div className="icon pull-right border circle">
              <span className="livicon livicon-processed" data-n="wrench" data-s={32} data-c="#35beeb" data-hc={0} id="livicon-2" style={{width: '32px', height: '32px'}}><svg height={32} version="1.1" width={32} xmlns="http://www.w3.org/2000/svg" style={{overflow: 'hidden', position: 'relative', top: '-0.15625px'}} id="canvas-for-livicon-2"><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël 2.1.2</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#35beeb" stroke="none" d="M11.954,7.18L10.026,4.882L7.071999999999999,5.401999999999999L6.046,8.221L7.974,10.519L10.928,9.999L11.954,7.18ZM7.851,8.665C7.318,8.03,7.401,7.084999999999999,8.036,6.552C8.671,6.02,9.616,6.101999999999999,10.149,6.736999999999999C10.681999999999999,7.371999999999999,10.597999999999999,8.318,9.963999999999999,8.85C9.329,9.382,8.384,9.299,7.851,8.665Z" opacity={0} strokeWidth={0} transform="matrix(1,0,0,1,0,0)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 0}} /><path fill="#35beeb" stroke="none" d="M20.046,24.82L21.974999999999998,27.118000000000002L24.929,26.597L25.953999999999997,23.779L24.025999999999996,21.481L21.071999999999996,22.002000000000002L20.046,24.82ZM24.149,23.336C24.681,23.971,24.599,24.915999999999997,23.964000000000002,25.448999999999998C23.329,25.979999999999997,22.384,25.898,21.851000000000003,25.262999999999998S21.402,23.683,22.036,23.15C22.671,22.618,23.616,22.701,24.149,23.336Z" opacity={0} strokeWidth={0} transform="matrix(1,0,0,1,0,0)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 0}} /><path fill="#35beeb" stroke="none" d="M15.03,13.384L3.969999999999999,23.028C2.791999999999999,24.055,2.669999999999999,25.843999999999998,3.6929999999999987,27.025C4.716999999999999,28.206,6.501999999999999,28.331999999999997,7.6789999999999985,27.304L18.75,17.649C21.246,18.847,24.320999999999998,18.531000000000002,26.543,16.593C28.65,14.757,29.419999999999998,11.957,28.781,9.416L24.483999999999998,13.11L20.979,11.9L20.271,8.249L24.579,4.546000000000001C22.151,3.542000000000001,19.265,3.9120000000000013,17.148,5.758000000000001C14.916,7.704,14.178,10.73,15.03,13.384Z" transform="matrix(1,0,0,1,0,0)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /></svg></span>
            </div>
            <div className="starting">Starting at</div>
            <div className="price">Ksh200<span>/month</span></div>
          </div>
          <ul className="options">
            <li><span><i className="fa fa-check" /></span>Responsive Design
            </li>
            <li className="active"><span><i className="fa fa-check" /></span>Styled elements
            </li>
            <li><span><i className="fa fa-check" /></span>Easy Setup
            </li>
          </ul>
          <div className="bottom-box">
            <a  className="more">Read More <span className="fa fa-angle-right" /></a>
            <div className="rating-box">
              <div style={{width: '80%'}} className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="73px" height="12px" viewBox="0 0 73 12" enable-fwb-bg="new 0 0 73 12" xmlSpace="preserve">
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="6.5,0 8,5 13,5 9,7.7 10,12 6.5,9.2 3,12 4,7.7 0,5 5,5" />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="66.5,0 68,5 73,5 69,7.7 70,12 66.5,9.2 63,12 64,7.7 60,5 65,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="21.5,0 23,5 28,5 24,7.7 25,12 21.5,9.2 18,12 19,7.7 15,5 20,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="51.5,0 53,5 58,5 54,7.7 55,12 51.5,9.2 48,12 49,7.7 45,5 50,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="36.5,0 38,5 43,5 39,7.7 40,12 36.5,9.2 33,12 34,7.7 30,5 35,5 " />
                </svg>
              </div>
            </div>
            {user === null ? (
              <a onClick={checkLogin}  style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>  
            ):(
              <a onClick={() => handleModalShow('200',1)} style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>    
            )}
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="pricing-success pricing">
          <div className="title"><a>Premium</a></div>
          <div className="price-box">
            <div className="icon pull-right border circle">
              <span className="livicon livicon-processed" data-n="piggybank" data-s={32} data-c="#9ab71a" data-hc={0} id="livicon-3" style={{width: '32px', height: '32px'}}><svg height={32} version="1.1" width={32} xmlns="http://www.w3.org/2000/svg" style={{overflow: 'hidden', position: 'relative', top: '-0.15625px'}} id="canvas-for-livicon-3"><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël 2.1.2</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#9ab71a" stroke="none" d="M13.745,18.354V19.419999999999998C13.315999999999999,19.319999999999997,13.101999999999999,19.151999999999997,13.101999999999999,18.913999999999998C13.103,18.732,13.2,18.4,13.745,18.354ZM14.251,20.514V21.662C14.899999999999999,21.599,14.947999999999999,21.275,14.947999999999999,21.073999999999998C14.948,20.865,14.715,20.678,14.251,20.514ZM18,20C18,22.209,16.209,24,14,24S10,22.209,10,20S11.791,16,14,16S18,17.791,18,20ZM15.937,20.951C15.950999999999999,20.705000000000002,15.700999999999999,20.099,15.376,19.912C15.117999999999999,19.764,14.6,19.599,14.296,19.543V18.381C14.6,18.4,14.7,18.6,14.788,18.75C14.870000000000001,18.941,15.017,19.037,15.226,19.037H15.773000000000001C15.755,18.572,15.501000000000001,17.698999999999998,14.297,17.573999999999998L14.3,17C14.3,17,13.941,16.987,13.804,16.987H13.790000000000001V17.573999999999998C12.499,17.598999999999997,12.247000000000002,18.503999999999998,12.231000000000002,18.968999999999998C12.2,19.9,12.6,20.1,13.746,20.4V21.6C13.591000000000001,21.573,13.146,21.5,13.094000000000001,20.911H12.164000000000001C12.201000000000002,21.423000000000002,12.646,22.501,13.746000000000002,22.501V23H14.246000000000002V22.5C15.5,22.5,15.9,21.6,15.937,20.951Z" transform="matrix(1,0,0,1,0,0)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#9ab71a" stroke="none" d="M13.745,18.354V19.419999999999998C13.315999999999999,19.319999999999997,13.101999999999999,19.151999999999997,13.101999999999999,18.913999999999998C13.103,18.732,13.2,18.4,13.745,18.354ZM14.251,20.514V21.662C14.899999999999999,21.599,14.947999999999999,21.275,14.947999999999999,21.073999999999998C14.948,20.865,14.715,20.678,14.251,20.514ZM18,20C18,22.209,16.209,24,14,24S10,22.209,10,20S11.791,16,14,16S18,17.791,18,20ZM15.937,20.951C15.950999999999999,20.705000000000002,15.700999999999999,20.099,15.376,19.912C15.117999999999999,19.764,14.6,19.599,14.296,19.543V18.381C14.6,18.4,14.7,18.6,14.788,18.75C14.870000000000001,18.941,15.017,19.037,15.226,19.037H15.773000000000001C15.755,18.572,15.501000000000001,17.698999999999998,14.297,17.573999999999998L14.3,17C14.3,17,13.941,16.987,13.804,16.987H13.790000000000001V17.573999999999998C12.499,17.598999999999997,12.247000000000002,18.503999999999998,12.231000000000002,18.968999999999998C12.2,19.9,12.6,20.1,13.746,20.4V21.6C13.591000000000001,21.573,13.146,21.5,13.094000000000001,20.911H12.164000000000001C12.201000000000002,21.423000000000002,12.646,22.501,13.746000000000002,22.501V23H14.246000000000002V22.5C15.5,22.5,15.9,21.6,15.937,20.951Z" transform="matrix(1,0,0,1,10,0)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#9ab71a" stroke="none" d="M13.745,18.354V19.419999999999998C13.315999999999999,19.319999999999997,13.101999999999999,19.151999999999997,13.101999999999999,18.913999999999998C13.103,18.732,13.2,18.4,13.745,18.354ZM14.251,20.514V21.662C14.899999999999999,21.599,14.947999999999999,21.275,14.947999999999999,21.073999999999998C14.948,20.865,14.715,20.678,14.251,20.514ZM18,20C18,22.209,16.209,24,14,24S10,22.209,10,20S11.791,16,14,16S18,17.791,18,20ZM15.937,20.951C15.950999999999999,20.705000000000002,15.700999999999999,20.099,15.376,19.912C15.117999999999999,19.764,14.6,19.599,14.296,19.543V18.381C14.6,18.4,14.7,18.6,14.788,18.75C14.870000000000001,18.941,15.017,19.037,15.226,19.037H15.773000000000001C15.755,18.572,15.501000000000001,17.698999999999998,14.297,17.573999999999998L14.3,17C14.3,17,13.941,16.987,13.804,16.987H13.790000000000001V17.573999999999998C12.499,17.598999999999997,12.247000000000002,18.503999999999998,12.231000000000002,18.968999999999998C12.2,19.9,12.6,20.1,13.746,20.4V21.6C13.591000000000001,21.573,13.146,21.5,13.094000000000001,20.911H12.164000000000001C12.201000000000002,21.423000000000002,12.646,22.501,13.746000000000002,22.501V23H14.246000000000002V22.5C15.5,22.5,15.9,21.6,15.937,20.951Z" transform="matrix(1,0,0,1,6,-5)" strokeWidth={0} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#9ab71a" stroke="none" d="M26,23.999C25.303,24.328999999999997,26.033,26.904999999999998,25.199,27.61C24.705000000000002,28.214,22.385,27.852,22.136000000000003,27.967C21.419000000000004,27.807,22.439000000000004,25.487,21.597,25.619C20.247,26.006,16.628,26.029,16.085,25.978C15.937000000000001,25.962000000000003,16.085,27.806,15.571000000000002,27.966C14.634000000000002,27.997,13.727000000000002,28.025000000000002,13.353000000000002,27.950000000000003C12.164000000000001,27.983000000000004,12.915000000000001,25.688000000000002,12.612000000000002,25.454000000000004C12.430000000000001,25.395000000000003,11.276000000000002,25.120000000000005,11.100000000000001,25.052000000000003C10.802000000000001,25.130000000000003,10.835,26.652000000000005,10.399000000000001,27.009000000000004C9.670000000000002,27.333000000000006,7.687000000000001,26.999000000000002,7.408000000000001,26.427000000000003C6.963000000000001,24.906000000000002,8.218000000000002,23.243000000000002,7.965000000000002,22.989000000000004C6.980000000000001,22.290000000000003,6.710000000000002,22.737000000000005,6.001000000000001,21.837000000000003C4.574000000000002,20.267000000000003,3.6940000000000013,21.544000000000004,2.397000000000001,20.382000000000005C1.604,19.31,2.2,16.419,2.46,16.08C3.004,15.372999999999998,3.55,16.287999999999997,4,15.085999999999999C4.189,12.447999999999999,5.332,10.052,7.371,8.204999999999998C6.382,7.194,4.564,4.929,6.667,3.733C8.704,3.318,12.581,6.0600000000000005,12.581,6.0600000000000005S14.931,5.3340000000000005,17.519,5.3340000000000005C24.871,5.3340000000000005,29.999,10.178,29.999,16.151C30,19.741,29.211,21.938,26,23.999L26,23.999ZM7.719,10.968C7.719,11.464,8.318,12.187,8.813,12.187C9.309000000000001,12.187,10.369,11.818,10.188,10.843C10.186,10.83,7.719,10.473,7.719,10.968ZM23.25,8.869C21.795,8.372,20.041,7.88,16.924,8.024C16.445,8.024,16.055,8.540999999999999,16.055,9.020999999999999S16.445999999999998,9.889999999999999,16.924,9.889999999999999C16.924,9.889999999999999,20.35,9.573999999999998,23.25,10.735999999999999C23.73,10.735999999999999,24.049,10.338999999999999,24.119,9.863999999999999C24.213,9.243,23.25,8.869,23.25,8.869Z" opacity={1} strokeWidth={0} transform="matrix(1,0,0,1,0,0)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 1}} /></svg></span>
            </div>
            <div className="starting">Starting at</div>
            <div className="price">Ksh300<span>/month</span></div>
          </div>
          <ul className="options">
            <li className="active"><span><i className="fa fa-check" /></span>Responsive Design
            </li>
            <li className="active"><span><i className="fa fa-check" /></span>Styled elements
            </li>
            <li><span><i className="fa fa-check" /></span>Easy Setup
            </li>
          </ul>
          <div className="bottom-box">
            <a className="more">Read More <span className="fa fa-angle-right" /></a>
            <div className="rating-box">
              <div style={{width: '80%'}} className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="73px" height="12px" viewBox="0 0 73 12" enable-fwb-bg="new 0 0 73 12" xmlSpace="preserve">
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="6.5,0 8,5 13,5 9,7.7 10,12 6.5,9.2 3,12 4,7.7 0,5 5,5" />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="66.5,0 68,5 73,5 69,7.7 70,12 66.5,9.2 63,12 64,7.7 60,5 65,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="21.5,0 23,5 28,5 24,7.7 25,12 21.5,9.2 18,12 19,7.7 15,5 20,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="51.5,0 53,5 58,5 54,7.7 55,12 51.5,9.2 48,12 49,7.7 45,5 50,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="36.5,0 38,5 43,5 39,7.7 40,12 36.5,9.2 33,12 34,7.7 30,5 35,5 " />
                </svg>
              </div>
            </div>
            {user === null ? (
              <a onClick={checkLogin}  style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>  
            ):(
              <a onClick={() => handleModalShow('300',1)} style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>    
            )}
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="pricing-error pricing">
          <div className="title"><a >Premium Pro</a></div>
          <div className="price-box">
            <div className="icon pull-right border circle">
              <span className="livicon livicon-processed" data-n="key" data-s={32} data-c="#de2a61" data-hc={0} id="livicon-4" style={{width: '32px', height: '32px'}}><svg height={32} version="1.1" width={32} xmlns="http://www.w3.org/2000/svg" style={{overflow: 'hidden', position: 'relative', top: '-0.15625px'}} id="canvas-for-livicon-4"><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël 2.1.2</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /><path fill="#de2a61" stroke="none" d="M18.16,6.956C16.426000000000002,8.690000000000001,16.425,11.104,18.179,12.858C19.241999999999997,13.92,20.695,14.525,22.162999999999997,14.748000000000001L22.195999999999998,25.509C22.197999999999997,25.798000000000002,22.317999999999998,26.079,22.52,26.281C22.971,26.732,23.997,26.733999999999998,24.445,26.285999999999998C24.644000000000002,26.086999999999996,24.764,25.807,24.764,25.519L24.752,23.279999999999998L26.291,23.284999999999997C26.292,23.621999999999996,26.171,24.084999999999997,26.379,24.292999999999996C26.566000000000003,24.479999999999997,28.042,24.482999999999997,28.226000000000003,24.299999999999997C28.458000000000002,24.067999999999998,28.429000000000002,20.906,28.318,20.770999999999997C28.156000000000002,20.566,26.66,20.580999999999996,26.474,20.766C26.266000000000002,20.973,26.285,21.407999999999998,26.287,21.744999999999997L24.747,21.740999999999996L24.727,14.754999999999995C26.196,14.541999999999996,27.645,13.944999999999995,28.7,12.890999999999995C30.442,11.147999999999994,30.428,8.733999999999995,28.681,6.987999999999995C26.044,4.35,20.782,4.334,18.16,6.956ZM27.029,11.475C26.181,12.323,20.695,12.305,19.842,11.453C18.988,10.6,18.985,9.221,19.831999999999997,8.373999999999999C20.679999999999996,7.525999999999999,26.165999999999997,7.542999999999999,27.017999999999997,8.395C27.872,9.248,27.876,10.628,27.029,11.475Z" opacity={0} strokeWidth={0} transform="matrix(1,0,0,1,0,0)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 0}} /><path fill="#de2a61" stroke="none" d="M24.472,5.294C22.275000000000002,3.0969999999999995,18.685000000000002,3.1239999999999997,16.454,5.353999999999999C16.201,5.606999999999999,15.976,5.876999999999999,15.780000000000001,6.161999999999999L6.028,6.235L3.604,8.659C3.1590000000000003,9.104000000000001,3.153,9.824000000000002,3.592,10.263000000000002L4.3870000000000005,11.058000000000002L5.195,10.250000000000002L6.86,11.130000000000003L8.402000000000001,10.225000000000003L9.993,11.816000000000003L11.608,10.201000000000002L13.315000000000001,11.677000000000003L15.280000000000001,11.778000000000004C15.547,12.356000000000003,15.918000000000001,12.896000000000004,16.394000000000002,13.372000000000003C18.589000000000002,15.567000000000004,22.179000000000002,15.540000000000003,24.410000000000004,13.309000000000003S26.666,7.489,24.472,5.294ZM7.081,8.124L7.091,6.99L14.312000000000001,6.917L14.304,8.05L7.081,8.124ZM21.62,10.524C20.962,9.866,20.972,8.789,21.64,8.120999999999999C22.310000000000002,7.450999999999999,23.386,7.442999999999999,24.044,8.099999999999998C24.703,8.759999999999998,24.696,9.836999999999998,24.026,10.506999999999998C23.357,11.176,22.28,11.184,21.62,10.524Z" opacity={0} strokeWidth={0} transform="matrix(1,0,0,1,0,0)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 0}} /><path fill="#de2a61" stroke="none" d="M29.381,10.583L21.393,2.5949999999999998C20.715,1.9179999999999997,19.508,1.7979999999999996,18.711000000000002,2.3299999999999996L11.158000000000001,7.365C10.361,7.896,10.059000000000001,9.032,10.488000000000001,9.889C10.488000000000001,9.889,12.541,13.983,12.615000000000002,14.113999999999999L2.8740000000000023,23.854999999999997L2,29.976L7,30V28H10V25H14V21H17L17.738,19.287C17.912,19.391,22.087,21.487,22.087,21.487C22.943,21.915999999999997,24.079,21.613999999999997,24.61,20.816999999999997L29.646,13.263999999999996C30.178,12.467,30.058,11.26,29.381,10.583ZM6.115,25.348L4.8790000000000004,24.112L13.392,15.598999999999998L14.628,16.834999999999997L6.115,25.348ZM27.056,13.575L25.819000000000003,14.812C25.479000000000003,15.152,24.923000000000002,15.152,24.583000000000002,14.812L17.165000000000003,7.393C16.824,7.053,16.824,6.497,17.165000000000003,6.157L18.4,4.92C18.74,4.58,19.296,4.58,19.636,4.92L27.055,12.338000000000001C27.396,12.679,27.396,13.235,27.056,13.575Z" strokeWidth={0} transform="matrix(1,0,0,1,0,0)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} /></svg></span>
            </div>
            <div className="starting">Starting at</div>
            <div className="price">Ksh500<span>/month</span></div>
          </div>
          <ul className="options">
            <li className="active"><span><i className="fa fa-check" /></span>Responsive Design
            </li>
            <li className="active"><span><i className="fa fa-check" /></span>Styled elements
            </li>
            <li className="active"><span><i className="fa fa-check" /></span>Easy Setup
            </li>
          </ul>
          <div className="bottom-box">
            <a  className="more">Read More <span className="fa fa-angle-right" /></a>
            <div className="rating-box">
              <div style={{width: '100%'}} className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="73px" height="12px" viewBox="0 0 73 12" enable-fwb-bg="new 0 0 73 12" xmlSpace="preserve">
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="6.5,0 8,5 13,5 9,7.7 10,12 6.5,9.2 3,12 4,7.7 0,5 5,5" />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="66.5,0 68,5 73,5 69,7.7 70,12 66.5,9.2 63,12 64,7.7 60,5 65,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="21.5,0 23,5 28,5 24,7.7 25,12 21.5,9.2 18,12 19,7.7 15,5 20,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="51.5,0 53,5 58,5 54,7.7 55,12 51.5,9.2 48,12 49,7.7 45,5 50,5 " />
                  <polygon fillRule="evenodd" clipRule="evenodd" fill="#1e1e1e" points="36.5,0 38,5 43,5 39,7.7 40,12 36.5,9.2 33,12 34,7.7 30,5 35,5 " />
                </svg>
              </div>
            </div>
            {user === null ? (
              <a onClick={checkLogin}  style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>  
            ):(
              <a onClick={() => handleModalShow('500',1)} style={{backgroundColor:'#00A300',border:'2px solid #00A300'}} className="btn btn-lg btn-warning clearfix">
              <img src='https://images.ctfassets.net/sb7j5o4oxtgv/30gWiBWqcqhQ6hqJFdubuq/3c3450bb73493d141d3a90de46105a8e/mpesa.jpg' style={{height:40,borderRadius:8}} />
            </a>    
            )}
          </div>
        </div>
      </div>
    </div>
  </div>



  <Modal show={show} onHide={handleModalClose}
  size="sm"
  aria-labelledby="example-modal-sizes-title-sm"
  centered
  >
  <div className="d-flex justify-content-center">
    <div className="card px-3 py-4">
      <center className="media mt-4 pl-2">
        <img src="/images/1200px-M-PESA_LOGO-01.svg.png" className="mr-3" height={75} />
        <div className="media-body">
        <div className="price" style={{fontWeight:'bold'}}>Ksh{plan}<span>/month</span></div>
        </div>
      </center>
      <div className="media mt-3 pl-2">
        {/*bs5 input*/}
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Format (2547...)" />
          </div>
          <center  className="col-12">
            <button onClick={handleSubmit} type="submit" className="btn btn-success" name="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe Now"}
            </button>
          </center>
        </div>
        {/*bs5 input*/}
      </div>
    </div>
  </div>
</Modal>

    <Footer />
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
    onClick={handleClose}
  >
    Processing...<CircularProgress color="inherit" />
  </Backdrop>
    </div>
  )
}

export default Pricing
