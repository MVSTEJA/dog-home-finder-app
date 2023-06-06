import { Box, Button, useTheme } from '@mui/material';
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
      variant={iconState ? 'contained' : 'text'}
      startIcon={startIcon}
      onClick={handleClick}
      {...props}
      title={btnText}
      endIcon={
        selectedText && showClose ? (
          <Box
            component={Button}
            variant="text"
            sx={{
              p: 0,
              minWidth: '20px',
              backgroundColor: 'transparent',
            }}
            onClick={(evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              clearAction();
            }}
          >
            <CloseIcon color={iconState ? 'primary' : 'secondary'} />
          </Box>
        ) : null
      }
    >
      {btnText} {selectedText ? ` \u00B7 ${selectedText}` : ''}
    </Button>
  );
};

export default CustomIconBtn;
