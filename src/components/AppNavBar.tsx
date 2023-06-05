import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Box, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import WalkingDog from '../assets/dog-walking.png';

import { ROUTE_CODES } from '../constants';
import ConfirmationDialog from './common/ConfirmationDialog';
import ColorModeContext from '../context/ColorMode';

const ButtonAppBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openConfim, setOpenConfim] = React.useState(false);
  const [, setIsLoggedIn] = useLocalStorage('login', true);
  const handleClose = () => {
    setOpenConfim(false);
  };

  const handleSubmit = () => {
    setIsLoggedIn(false);
    handleClose();
    navigate(ROUTE_CODES.SIGNIN);
  };
  const appTheme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <ConfirmationDialog
        open={openConfim}
        onSubmit={handleSubmit}
        onClose={handleClose}
        variant="danger"
        title="Do you want to exit the application ?"
      />
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          position: 'fixed',
          top: 0,
          zIndex: 1,
          left: 0,
          right: 0,
          backgroundColor: appTheme.palette.background.default,
          backgroundImage: 'none',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
            <img
              src={WalkingDog}
              onClick={() => {
                navigate(ROUTE_CODES.HOME);
              }}
              height="50px"
              alt="d-gwalking"
            />
          </Box>

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {appTheme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {!location.pathname.includes('/signin') && (
            <Button
              variant="text"
              sx={{
                textTransform: 'initial',
              }}
              onClick={() => {
                setOpenConfim(true);
              }}
            >
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ButtonAppBar;
