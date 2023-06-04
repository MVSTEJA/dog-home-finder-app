import Button from '@mui/material/Button';
import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import standingImage from '../assets/walking-a-dog.svg';
import { createLogin } from '../api';
import { User } from '../types';
import { ROUTE_CODES } from '../constants';

const SignInSide: React.FC = () => {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useLocalStorage('login', true);

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

  const handleSubmit = (event: React.SyntheticEvent) => {
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

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '70vh',
        backgroundColor: (t) =>
          t.palette.mode === 'light'
            ? t.palette.grey[100]
            : t.palette.grey[900],
      }}
    >
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage: `url(${standingImage})`,
          backgroundRepeat: 'no-repeat',

          backgroundSize: 'auto',
          backgroundPosition: 'center',
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          maxHeight: '100vh',
        }}
      />
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[100]
              : t.palette.grey[900],
          boxShadow: 'none',
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

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
