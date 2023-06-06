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
  useTheme,
} from '@mui/material';
import { AxiosError } from 'axios';
import { FC, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { createLogin } from 'src/api';
import HappyDog from 'src/assets/dog.png';
import standingImage from 'src/assets/walking-a-dog.svg';
import happyImage from 'src/assets/bye-pet.svg';
import { MOBILE_WIDTH_QUERY, ROUTE_CODES } from 'src/constants';
import { User } from 'src/types';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog';

const SignInSide: FC = () => {
  const [, navigate] = useLocation();
  const loggedIn: boolean | null = useReadLocalStorage('login');

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('login', loggedIn);

  const { mutate } = useMutation<string, AxiosError, User>({
    mutationFn: createLogin,
    onError: (err) => {
      toast.error(
        err?.response
          ? `${err?.response} request.`
          : 'Invalid credentials provided'
      );
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate(ROUTE_CODES.HOME);
    },
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    console.log(email);
    if (email === '') {
      setEmailError('Please enter an email');
      return false;
    }
    if (!email?.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)) {
      setEmailError('Please provide valid email');
      return false;
    }
    setEmailError('');
    return true;
  };
  const validateName = (name: string) => {
    if (name === '') {
      setNameError('Please provide a name');
      return false;
    }
    setNameError('');
    return true;
  };

  console.log(nameError, emailError);
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      name: { value: string };
    };

    const { email, name } = target;
    if (!validateName(name.value)) return;
    if (!validateEmail(email.value)) return;

    toast.success('Login success !');

    mutate({
      email: email.value,
      name: name.value,
    });
  };
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);

  const [openConfim, setOpenConfim] = useState(isLoggedIn);
  const handleClose = () => {
    setOpenConfim(false);
  };

  const handleBackNav = async () => {
    navigate(ROUTE_CODES.HOME);
  };
  const theme = useTheme();

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
          title="You have logged in already, return to the app?"
        />
      )}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        item
        xs={12}
        sm={12}
        mb={4}
      >
        <Grid item xs={12} sm={4}>
          <Box
            component={Paper}
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.main,
              textAlign: 'left',
              p: 1,
              color: 'white',
            }}
          >
            <Typography variant="h6" textAlign="center" gutterBottom>
              Good Day! Welcome to pet finder app.
            </Typography>
            <Typography variant="subtitle2">
              The app gives ablity to search for dogs nearby you. And provide a
              dog that matches you.
            </Typography>
          </Box>
        </Grid>
      </Grid>
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
          minHeight: `${matches ? '30vh' : '0'}`,
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
            my: 4,
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
              error={nameError !== ''}
              helperText={nameError}
              onInput={(evt) =>
                validateName((evt.target as HTMLInputElement)?.value)
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              inputMode="email"
              error={emailError !== ''}
              helperText={emailError}
              onInput={(evt) =>
                validateEmail((evt.target as HTMLInputElement)?.value)
              }
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
          minHeight: `${matches ? '30vh' : '0'}`,
        }}
      />
    </Grid>
  );
};

export default SignInSide;
