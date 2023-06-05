import { Button, useTheme } from '@mui/material';
import { ReactNode, FC } from 'react';

interface CustomIconBtnProps {
  handleClick: () => void;
  children: ReactNode;
  iconState: boolean;
  color?: string;
}

const CustomIconBtn: FC<CustomIconBtnProps> = ({
  handleClick,
  children,
  iconState,
  ...props
}: CustomIconBtnProps) => {
  const theme = useTheme();
  return (
    // @ts-expect-error this is complex
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
      {...props}
    />
  );
};

export default CustomIconBtn;
