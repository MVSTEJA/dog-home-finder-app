import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import ConfirmationDialog from './common/ConfirmationDialog';
import { ROUTE_CODES } from '../constants';

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
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: 'black' }}
            onClick={() => {
              navigate(ROUTE_CODES.HOME);
            }}
          >
            Home for shelter dogs
          </Typography>
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
