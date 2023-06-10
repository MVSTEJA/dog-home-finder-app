import { Box, Button, Typography, alpha, useTheme } from '@mui/material';
import {
  DefaultComponentProps,
  OverridableTypeMap,
} from '@mui/material/OverridableComponent';
import { ReactNode, FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface CustomIconBtnProps extends DefaultComponentProps<OverridableTypeMap> {
  handleClick: () => void;
  startIcon: ReactNode;
  btnText: string;
  iconState: boolean | string | undefined;
  color?: string;
  selectedText?: string;
  clearAction?: () => void;
  showClose?: boolean;
}

const CustomIconBtn: FC<CustomIconBtnProps> = ({
  handleClick,
  btnText,
  startIcon,
  iconState,
  selectedText = '',
  clearAction = () => {},
  showClose = false,
  ...props
}: CustomIconBtnProps) => {
  const theme = useTheme();
  return (
    // @ts-expect-error this is complex
    <Button
      sx={{
        borderRadius: theme.shape.borderRadius / 2,
        '& .MuiButton-startIcon': {
          mr: 0,
          ml: 0,
          alignSelf: 'center',
        },
      }}
      variant="contained"
      startIcon={startIcon}
      onClick={handleClick}
      {...props}
      title={btnText}
      endIcon={
        selectedText && showClose ? (
          <Box
            sx={{
              p: 0,
              borderRadius: 12,
              height: '25px',
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
                opacity: 0.2,
              },
            }}
            onClick={(evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              clearAction();
            }}
          >
            <CloseIcon />
          </Box>
        ) : null
      }
    >
      <Typography sx={{ width: 'max-content' }}>
        {btnText} {selectedText ? ` \u00B7 ${selectedText}` : ''}
      </Typography>
    </Button>
  );
};

export default CustomIconBtn;
