import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: grey[100],
    },
  },
});

const ButtonAppBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={lightTheme}>
        <AppBar
          position="static"
          sx={{
            boxShadow: '0',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Home for shelter dogs
            </Typography>
            <Button
              color="inherit"
              sx={{
                textTransform: 'initial',
              }}
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
      </ThemeProvider>
    </Box>
  );
};

export default ButtonAppBar;
