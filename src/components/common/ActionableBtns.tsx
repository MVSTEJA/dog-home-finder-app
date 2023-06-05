import { Button, useTheme } from '@mui/material';
import { ReactNode, FC } from 'react';

interface CustomIconBtnProps {
  handleClick: () => void;
  children: ReactNode;
  iconState: boolean;
}

const CustomIconBtn: FC<CustomIconBtnProps> = ({
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
