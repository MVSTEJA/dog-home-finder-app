import { Button, useTheme } from '@mui/material';

interface CustomIconBtnProps {
  handleClick: () => void;
  children: React.ReactNode;
  iconState: boolean;
}

const CustomIconBtn: React.FC<CustomIconBtnProps> = ({
  handleClick,
  children,
  iconState,
}: CustomIconBtnProps) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        borderRadius: theme.shape.borderRadius / 2,
        minWidth: 42,
        px: 0,
        '& .MuiButton-startIcon': {
          m: 0,
        },
      }}
      variant={iconState ? 'contained' : 'text'}
      startIcon={children}
      onClick={handleClick}
      color="secondary"
    />
  );
};

export default CustomIconBtn;
