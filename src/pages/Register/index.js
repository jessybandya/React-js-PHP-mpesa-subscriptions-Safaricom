import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const defaultTheme = createTheme();

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('normal');
    const subscriptionStatus = '0';
    const [password, setPassword] = useState('');
    const created_at = Date.now();
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const handleRegister = () => {
        setLoading(true);

        if(name === '' || email === '' || password === '') {
            toast.error('Please fill all fields',{
              position: "top-center",
            });
            setLoading(false);
            return;
        }else if(password.length < 6){
            toast.error('Password require more than 6 characters',{
              position: "top-center",
            });
            setLoading(false);
            return;
        }else{
            fetch('backend/signup.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `name=${name}&email=${email}&subscriptionType=${subscriptionType}&subscriptionStatus=${subscriptionStatus}&password=${password}&created_at=${created_at}`,
            })
              .then(response => response.text())
              .then(data => {
                console.log(data);
                if (data === 'New user created successfully') {
                  // Clear the input fields
                  setName('');
                  setEmail('');
                  setSubscriptionType('');
                  setPassword('');
                    // Show a success message
                    toast.success(data,{
                      position: "top-center",
                    });
                  // Navigate to the login page
                  history('/login');
                } else {
                  // Show the error message
                  toast.error(data,{
                    position: "top-center",
                  });
                }
              })
              .catch(error => {
                console.log(error);
                // Show an error message
                toast.error('An error occurred. Please try again.',{
                  position: "top-center",
                });
              })
              .finally(() => {
                setLoading(false);
              });
          }
         

    }

  return (
    <ThemeProvider theme={defaultTheme}>
    <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" style={{
            height:80
          }}/>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  label="Full Name"
                  value={name} 
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: '#00D100',
              }}
              onClick={handleRegister}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link class="no-underline"
                style={{
                    color: '#00D100'
                }} 
                to="/login"
                variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}