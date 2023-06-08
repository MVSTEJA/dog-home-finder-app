import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';

import {
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AxiosError } from 'axios';
import { FC, SyntheticEvent, useState } from 'react';

import { toast } from 'react-hot-toast';
import { createLogin } from 'src/api';
import happyImage from 'src/assets/bye-pet.svg';
import HappyDog from 'src/assets/dog.png';
import standingImage from 'src/assets/walking-a-dog.svg';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog';
import { MOBILE_WIDTH_QUERY, ROUTE_CODES } from 'src/constants';
import { User } from 'src/types';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

const SignInSide: FC = () => {
  const [, navigate] = useLocation();

  const loggedIn: boolean | null = useReadLocalStorage('login');

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('login', loggedIn);

  const { mutate, isLoading, isSuccess } = useMutation<
    string,
    AxiosError,
    User
  >({
    mutationFn: createLogin,
    onError: (err) => {
      toast.error(
        err?.response
          ? `${err?.response} request.`
          : 'Invalid credentials provided',
        {
          position: 'top-right',
        }
      );
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      toast.success('Login success !', {
        position: 'top-center',
      });

      navigate(ROUTE_CODES.HOME);
    },
  });

  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (email: string) => {
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

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      name: { value: string };
    };

    const { email, name } = target;
    if (!validateName(name.value)) return;
    if (!validateEmail(email.value)) return;

    mutate({
      email: email.value,
      name: name.value,
    });
  };
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);

  const [openConfim, setOpenConfim] = useState<boolean | null>(isLoggedIn);
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
              backgroundColor: theme.palette.secondary.main,
              textAlign: 'left',
              p: 1,
              color: 'primary.light',
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
        sx={{
          position: 'relative',
        }}
      >
        <Stack
          component={Paper}
          elevation={0}
          sx={{
            p: 4,
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
          <Stack
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              height: '15vh',
            }}
          >
            <Box
              sx={{
                flexBasis: '45%',
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
                sx={{
                  m: 0,
                }}
                error={nameError !== ''}
                helperText={nameError}
                onInput={(evt) =>
                  validateName((evt.target as HTMLInputElement)?.value)
                }
              />
            </Box>
            <Box
              sx={{
                flexBasis: '45%',
                width: '100%',
              }}
            >
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
                sx={{
                  m: 0,
                }}
                onInput={(evt) =>
                  validateEmail((evt.target as HTMLInputElement)?.value)
                }
              />
            </Box>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              sx={{ flexBasis: '10%' }}
              loading={isLoading}
              loadingPosition="end"
              endIcon={
                isSuccess ? (
                  // @ts-expect-error this is complex
                  <CheckCircleOutlineRoundedIcon color="secondary.light" />
                ) : (
                  ''
                )
              }
            >
              Sign In
            </LoadingButton>
          </Stack>
        </Stack>
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
