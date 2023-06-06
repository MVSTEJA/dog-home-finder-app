import { ThemeOptions, alpha } from '@mui/material';
import { cloneDeep, merge } from 'lodash-es';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',

    primary: {
      main: '#890075',
    },
    secondary: {
      main: '#ffb402',
    },
    background: {
      default: '#F5EFE7',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: ['Lexend'],
          backgroundColor: '#F5EFE7',
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
          backgroundColor: '#F5EFE7',
        },
      },
    },

    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(137, 0, 117, 0.12)',
          },
          '&.Mui-selected': {
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#fff', 0.15),
          '&:hover': {
            backgroundColor: alpha('#fff', 0.25),
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
          backgroundColor: '#CCC2DC',
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
            border: '1px solid',
          },
          '&:hover': {
            border: '1px solid',
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
