import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Retrieve user details from session storage
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

const history = useNavigate();

  const handleLogout = () => {
    // Remove stored tokens and user data
    localStorage.removeItem('token');
    localStorage.removeItem('authId');
    sessionStorage.removeItem('user');
  
    // Redirect to login page
    history('/login');
  
    // Show toast notification
    toast.success('Logout successful', {
      position: 'top-center',
    })
  };

  return (
    <AppBar style={{
      backgroundColor: '#fff',
    }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
          >
             <img src= "https://www.nopcommerce.com/images/thumbs/0019616_lipanampesa.png" alt="logo" style={{height: 50}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link class="no-underline" style={{color:'#00D100',marginRight:8,fontWeight:'bold'}} to ="/pricing">Pricing</Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link class="no-underline" style={{color:'#00D100',marginRight:8,fontWeight:'bold'}} to ="/pricing">Pricing</Link>

          </Box>
          {user === null ? (
            <span>
              <Link class="no-underline" style={{color:'#00D100',marginRight:8,fontWeight:'bold'}} to ="/login">Login</Link>
              <Link class="no-underline" style={{color:'#00D100', fontWeight:'bold'}} to ="/register">Register</Link>
            </span>
          ):(
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="M-Pesa" src="https://kisumueducation.uonbi.ac.ke/sites/default/files/2020-08/University_Of_Nairobi_Towers.jpg" />
              </IconButton>
            </Tooltip>

              <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem >
                <Link class="no-underline" style={{color:'#00D100',marginRight:8,fontWeight:'bold'}} to ="/profile">Profile</Link>
                </MenuItem>
                <hr />
                <MenuItem onClick={handleLogout}>
                <span class="no-underline" style={{color:'#00D100',marginRight:8,fontWeight:'bold'}}>Logout</span>
              </MenuItem>
            </Menu>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
