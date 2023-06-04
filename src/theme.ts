import { grey } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    contrastThreshold: 4.5,
    primary: {
      light: '#a03390',
      main: '#890075',
      dark: '#5f0051',
    },
    secondary: {
      main: '#ff9100',
    },
    tonalOffset: 0.2,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: ['Lexend'],
          backgroundColor: grey[100],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['Lexend'],
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          fontFamily: ['Lexend'],
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            boxShadow: '0px 0px 15px 1px rgba(168,168,168,1)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(137, 0, 117, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: ['Lexend'],
          borderRadius: 12,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'medium',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'medium',
      },
    },
    MuiIcon: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        colorPrimary: {
          color: '#a03390',
        },
      },
    },

    MuiChip: {
      defaultProps: {
        color: 'primary',
        variant: 'outlined',
      },
      styleOverrides: {
        outlined: {
          backgroundColor: 'rgba(137, 0, 117, 0.08)',
          borderColor: 'transparent',
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        colorSecondary: {
          color: 'white',
        },
        colorPrimary: {
          color: '#a03390',
        },
      },
    },
  },
};

export const mobileThemeOptions: ThemeOptions = merge(
  cloneDeep(themeOptions),
  cloneDeep({
    components: {
      MuiButton: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          size: 'small',
        },
      },
    },
  })
);
