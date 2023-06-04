import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Box } from '@mui/material';
import WalkingDog from '../assets/dog-walking.png';

import { ROUTE_CODES } from '../constants';
import ConfirmationDialog from './common/ConfirmationDialog';

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
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ButtonAppBar;
