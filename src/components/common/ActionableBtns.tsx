import { Button, useTheme } from '@mui/material';

const CustomIconBtn = ({ handleClick, children, iconState }) => {
  const theme = useTheme();
  return (
    // <ThemeProvider theme={theme}>
    <Button
      sx={{
        borderRadius: theme.shape.borderRadius / 2,
        minWidth: 42,
        px: 0,
        '& .MuiButton-startIcon': {
          m: 0,
        },
        color: iconState ? 'white' : '',
      }}
      variant={iconState ? 'contained' : 'text'}
      startIcon={children}
      onClick={handleClick}
      size="large"
      color="secondary"
    />
    // </ThemeProvider>
  );
};

export default CustomIconBtn;
