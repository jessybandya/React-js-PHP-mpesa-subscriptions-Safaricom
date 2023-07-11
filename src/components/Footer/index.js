import { Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link class="no-underline" color="inherit" href="https://mui.com/">
      M-Pesa Subscription. All rights reserved.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <footer>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </footer>
  )
}

export default Footer