import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import * as React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { createLogin } from '../api';
import { User } from '../types';

interface CopyrightProps {
  sx: { mt: number };
}

const Copyright: React.FC<CopyrightProps> = ({ sx }: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

const SignInSide: React.FC = () => {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useLocalStorage('login', true);

  const { mutate } = useMutation<string, Error, User>({
    mutationFn: createLogin,
    onError: (err) => {
      toast.error(
        err?.response ? `${err?.response} request.` : 'No credentials provided'
      );
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate('/dashboard');
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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[500]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopRightRadius: 6,
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
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

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="" variant="body2">
                  Forgot name?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid> */}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
