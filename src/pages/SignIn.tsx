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
  useTheme,
} from '@mui/material';
import { AxiosError } from 'axios';
import { FC, SyntheticEvent, useState, FormEvent } from 'react';

import { toast } from 'react-hot-toast';
import { createLogin } from 'src/api';
import happyImage from 'src/assets/bye-pet.svg';
import HappyDog from 'src/assets/dog.png';
import standingImage from 'src/assets/walking-a-dog.svg';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog';
import { ROUTE_CODES } from 'src/constants';
import { User } from 'src/types';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

export interface SignInSideFormProps {
  isLoggedIn: boolean | null;
  openConfim: boolean | null;
  handleBackNav: () => void;
  handleClose: () => void;
  handleSubmit: (event: SyntheticEvent) => void;
  nameError: string;
  emailError: string;
  handleNameInput: (evt: FormEvent) => void;
  handleEmailInput: (evt: FormEvent) => void;
  isSuccess: boolean;
  isLoading: boolean;
}

export const SignInSideForm: FC<SignInSideFormProps> = ({
  isLoggedIn = false,
  openConfim = false,
  handleBackNav,
  handleClose,
  handleSubmit,
  nameError,
  emailError,
  handleNameInput,
  handleEmailInput,
  isSuccess,
  isLoading,
}) => {
  const appTheme = useTheme();
  const matches = appTheme.breakpoints.up('sm');

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
              backgroundColor: appTheme.palette.secondary.main,
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
            minHeight: '30vh',
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
              minHeight: '200px',
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
                placeholder="abc"
                error={nameError !== ''}
                helperText={nameError}
                onInput={handleNameInput}
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
                placeholder="abc@xyz.com"
                autoComplete="email"
                type="email"
                inputMode="email"
                error={emailError !== ''}
                helperText={emailError}
                sx={{
                  m: 0,
                }}
                onBlur={handleEmailInput}
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

const SignInSideContainer: FC = () => {
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
          id: 'credentials',
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
    if (email === '' || !email) {
      return 'Please enter an email';
    }
    if (!email?.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)) {
      return 'Please provide valid email';
    }
    return '';
  };
  const validateName = (name: string) => {
    if (name === '' || !name) {
      return 'Please provide a name';
    }

    return '';
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      name: { value: string };
    };

    const { email = { value: '' }, name = { value: '' } } = target;

    const [nameErrorVal, emailErrorVal] = [
      validateName(name.value),
      validateEmail(email.value),
    ];

    if (nameErrorVal || emailErrorVal) {
      setNameError(nameErrorVal);
      setEmailError(emailErrorVal);
      return;
    }

    mutate({
      email: email.value,
      name: name.value,
    });
  };

  const [openConfim, setOpenConfim] = useState<boolean | null>(isLoggedIn);
  const handleClose = () => {
    setOpenConfim(false);
  };

  const handleBackNav = async () => {
    navigate(ROUTE_CODES.HOME);
  };

  const handleEmailInput = (evt: FormEvent) => {
    setEmailError(validateEmail((evt.target as HTMLInputElement).value));
  };
  const handleNameInput = (evt: FormEvent) => {
    setNameError(validateName((evt.target as HTMLInputElement)?.value));
  };
  return (
    <SignInSideForm
      isLoggedIn={isLoggedIn}
      openConfim={openConfim}
      handleBackNav={handleBackNav}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      nameError={nameError}
      emailError={emailError}
      handleNameInput={handleNameInput}
      handleEmailInput={handleEmailInput}
      isSuccess={isSuccess}
      isLoading={isLoading}
    />
  );
};

export default SignInSideContainer;
