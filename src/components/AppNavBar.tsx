import { useLocation } from 'wouter';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  alpha,
  useTheme,
} from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { FC, useState, useContext } from 'react';
import WalkingDog from 'src/assets/dog-walking.svg';

import { ROUTE_CODES } from 'src/constants';
import ColorModeContext from 'src/context/ColorMode';
import { appLogOut } from 'src/api';
import ConfirmationDialog from './common/ConfirmationDialog';

const AppNavBar: FC = () => {
  const [, navigate] = useLocation();

  const [openConfim, setOpenConfim] = useState<boolean>(false);
  const loggedIn: boolean | null = useReadLocalStorage('login');
  const [, setIsLoggedIn] = useLocalStorage('login', loggedIn);
  const handleClose = () => {
    setOpenConfim(false);
  };

  const handleSubmit = async () => {
    setIsLoggedIn(false);
    handleClose();
    await appLogOut();
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
          backgroundColor: alpha('#c0e9fa', 0),
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

          <Box justifyContent="center">
            <IconButton
              onClick={toggleColorMode}
              sx={{ mr: 4 }}
              color="inherit"
            >
              {appTheme.palette.mode === 'dark' ? (
                <LightModeOutlined />
              ) : (
                <DarkModeOutlined color="action" />
              )}
            </IconButton>

            {loggedIn && (
              <Button
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppNavBar;
