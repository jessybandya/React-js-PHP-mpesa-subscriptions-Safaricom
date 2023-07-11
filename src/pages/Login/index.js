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



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleLogin = async(e) => {
    setLoading(true);

    if(email === '' || password === '') {
      toast.error('Please fill all fields',{
        position: "top-center",
      });
      setLoading(false);
      return;
    }else{
      const formData = {
        email: email,
        password: password,
      };
        try {
          const response = await fetch('https://electrikacomputers.co.ke/backend/php/sub/login.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const responseData = await response.text();
    
          const data = JSON.parse(responseData);
          if (data && data.error) {
            // Handle error
            console.error('Error:', data.error);
          } else if (data && data.message) {
  
            const successMessage = data.message; // Extract the success message
           toast.success(successMessage, {
            position: "top-center",
           });
            // Navigate to the login page
            const userDetails = {
              name: data.user.name,
              subscription_type: data.user.subscription_type,
              subscription_status: data.user.subscription_status,
              created_at: data.user.created_at,
              email: data.user.email,
              id: data.user.id,
            };
            
            sessionStorage.setItem('user', JSON.stringify(userDetails));

            history('/');
          } else {
            // Handle unexpected response format
            toast.error('Invalid response:', data, {
              position: "top-center",
            });
            setLoading(false)
          }
        } catch (error) {
          // Handle fetch or other network errors
          toast.error('Error:', error,{
            position: "top-center",
          });
          setLoading(false)
        }
    }  
  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" style={{
            height:80
          }}/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: '#00D100',
              }}
              onClick={handleLogin}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                class="no-underline"
                style={{
                    color: '#00D100'
                }} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                class="no-underline"
                style={{
                    color: '#00D100'
                }} 
                to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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