import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';

import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { AxiosError } from 'axios';
import { FC, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { createLogin } from 'src/api';
import HappyDog from 'src/assets/dog.png';
import standingImage from 'src/assets/walking-a-dog.svg';
import happyImage from 'src/assets/bye-pet.svg';
import { ROUTE_CODES } from 'src/constants';
import { User } from 'src/types';
import { useLocalStorage } from 'usehooks-ts';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog';

const SignInSide: FC = () => {
  const [, navigate] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('login', true);

  const { mutate } = useMutation<string, AxiosError, User>({
    mutationFn: createLogin,
    onError: (err) => {
      toast.error(
        err?.response ? `${err?.response} request.` : 'No credentials provided'
      );
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate(ROUTE_CODES.HOME);
    },
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      name: { value: string };
    };
    const email = target.email.value;
    const name = target.name.value;

    mutate({
      email,
      name,
    });
  };
  const matches = useMediaQuery('(min-width:600px)');

  const [openConfim, setOpenConfim] = useState(isLoggedIn);
  const handleClose = () => {
    setOpenConfim(false);
  };

  const handleBackNav = async () => {
    navigate(ROUTE_CODES.HOME);
  };
  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      height="80vh"
    >
      {isLoggedIn && (
        <ConfirmationDialog
          open={openConfim}
          onSubmit={handleBackNav}
          onClose={handleClose}
          variant="danger"
          title="You have logged in already, return ?"
        />
      )}
      <Grid
        item
        xs={false}
        sm={4}
        sx={{
          backgroundImage: `url(${happyImage})`,
          backgroundRepeat: 'no-repeat',

          backgroundSize: 'auto',
          backgroundPosition: 'center',
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          minHeight: '50vh',
        }}
      />
      <Grid
        item
        xs={12}
        sm={4}
        component={Paper}
        elevation={6}
        square
        sx={{
          boxShadow: 'none',
          minHeight: matches ? '25vh' : '50vh',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={HappyDog}
            width={50}
            sx={{
              position: 'absolute',
              top: -25,
            }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="current-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        sx={{
          backgroundImage: `url(${standingImage})`,
          backgroundRepeat: 'no-repeat',

          backgroundSize: 'auto',
          backgroundPosition: 'center',
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          minHeight: '50vh',
        }}
      />
    </Grid>
  );
};

export default SignInSide;
