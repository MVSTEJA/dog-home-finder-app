import { useLocation } from 'wouter';
import { useLocalStorage } from 'usehooks-ts';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useTheme,
} from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import { FC, useState, useContext } from 'react';
import WalkingDog from 'src/assets/dog-walking.png';

import { ROUTE_CODES } from 'src/constants';
import ColorModeContext from 'src/context/ColorMode';
import ConfirmationDialog from './common/ConfirmationDialog';

const ButtonAppBar: FC = () => {
  const [location, navigate] = useLocation();

  const [openConfim, setOpenConfim] = useState(false);
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
  const { toggleColorMode } = useContext(ColorModeContext);

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

          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {appTheme.palette.mode === 'dark' ? (
              <LightModeOutlined color="secondary" />
            ) : (
              <DarkModeOutlined color="action" />
            )}
          </IconButton>

          {!location.includes('/signin') && (
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
