import { grey } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    contrastThreshold: 4.5,
    primary: {
      main: '#890075',
    },
    secondary: {
      main: '#ff9100',
    },
    tonalOffset: 0.2,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px !important',
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
    MuiSvgIcon: {
      styleOverrides: {
        colorSecondary: {
          color: 'white',
        },
        colorPrimary: {
          color: '#890075',
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
    },
  })
);
