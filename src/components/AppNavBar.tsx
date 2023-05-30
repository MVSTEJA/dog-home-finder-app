import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLocation, useNavigate } from 'react-router-dom';

const ButtonAppBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate('/');
            }}
          >
            Home for shelter dogs
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              if (location.pathname.includes('/signin')) {
                navigate('/dashboard');
              } else {
                navigate('/signin');
              }
            }}
          >
            {location.pathname.includes('/signin') ? 'Login' : 'Logout'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
