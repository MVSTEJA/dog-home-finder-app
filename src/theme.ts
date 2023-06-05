import { ThemeOptions } from '@mui/material';
import { grey, common } from '@mui/material/colors';
import { cloneDeep, merge } from 'lodash-es';

export const lightThemeOptions: ThemeOptions = {
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
    background: {
      default: grey[200],
    },

    tonalOffset: 0.2,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: ['Lexend'],
          backgroundColor: grey[200],
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
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
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
          backgroundColor: grey[200],
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

    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        colorPrimary: '#890075',
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

    MuiChip: {
      styleOverrides: {
        outlined: {
          backgroundColor: 'rgba(137, 0, 117, 0.08)',
          borderColor: 'transparent',
        },
      },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: grey[700],
      paper: common.black,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[700],
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: grey[700],
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        outlined: {
          backgroundColor: 'rgba(137, 0, 117, 0.08)',
          borderColor: 'transparent',
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiSvgIcon-colorPrimary': {
            color: '#ffffff',
          },
        },
      },
    },
  },
};

export const darkBaseThemeOptions: ThemeOptions = merge(
  cloneDeep(lightThemeOptions),
  cloneDeep(darkThemeOptions)
);
export const mobileOnlyThemeOptions: ThemeOptions = {
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
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
  },
};

export const mobileLightThemeOptions: ThemeOptions = merge(
  cloneDeep(lightThemeOptions),
  cloneDeep(mobileOnlyThemeOptions)
);

export const mobiledarkThemeOptions: ThemeOptions = merge(
  cloneDeep(darkBaseThemeOptions),
  cloneDeep(mobileOnlyThemeOptions)
);
