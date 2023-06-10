import { ThemeOptions, alpha } from '@mui/material';
import { deepmerge } from '@mui/utils';

export const lightThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Lexend',
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    mode: 'light',

    primary: {
      main: '#006c48',
    },
    secondary: {
      main: '#ffdcc1',
    },
    background: {
      default: '#fbfdf8',
      paper: '#dce5dd',
    },
    common: {
      white: '#dce5dd',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fbfdf8',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
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
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#fbfdf8',
          '&.Mui-selected': {
            border: '0',
            boxShadow: '0 0 0 2px #006c48',
          },
          '&.Mui-selected:hover': {
            border: '0',
            boxShadow: '0 0 0 2px #006c48',
          },
          '&:hover': {
            border: '0',
            boxShadow: '0 0 0 1px #006c48',
          },
        },
      },
    },

    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha('#dce5dd', 0.15),
          },
          '&.Mui-selected': {
            backgroundColor: alpha('#dce5dd', 0.15),
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
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: alpha('#006c48', 0.15),
          '&:hover': {
            backgroundColor: alpha('#006c48', 0.25),
          },
        },
      },
    },

    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        colorPrimary: '#E74646',
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
          borderColor: 'transparent',
        },
      },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#EADDFF',
      main: '#4F378B',
    },
    secondary: {
      main: '#633B48',
    },
    neutral: {
      main: '',
    },
    background: {
      default: '#1C1B1F',
      paper: '#4A4458',
    },
    text: {
      primary: '#EADDFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1C1B1F',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#EADDFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: '#333',
          backgroundColor: '#dce5dd',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1C1B1F',
          '&.Mui-selected': {
            border: '0',
            boxShadow: '0 0 0 2px #abbe6f',
          },
          '&.Mui-selected:hover': {
            border: '0',
            boxShadow: '0 0 0 2px #abbe6f',
          },

          '&:hover': {
            border: '0',
            boxShadow: '0 0 0 1px #abbe6f',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#7D5260',
          borderColor: 'transparent',
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiSvgIcon-colorPrimary': {
            color: '#dce5dd',
          },
        },
      },
    },
  },
};

export const darkBaseThemeOptions: ThemeOptions = deepmerge(
  lightThemeOptions,
  darkThemeOptions
);
export const mobileOnlyThemeOptions: ThemeOptions = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
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

export const mobileLightThemeOptions: ThemeOptions = deepmerge(
  lightThemeOptions,
  mobileOnlyThemeOptions
);

export const mobiledarkThemeOptions: ThemeOptions = deepmerge(
  darkBaseThemeOptions,
  mobileOnlyThemeOptions
);

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
