import CloseIcon from '@mui/icons-material/Close';

import {
  Zoom,
  Stack,
  Button,
  Box,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

const FindMatchSection = ({
  checked,
  handleClickOpen,
  handleClearSelection,
}: {
  checked: string[];
  handleClickOpen: () => void;
  handleClearSelection: () => void;
}) => {
  const theme = useTheme();
  return (
    <Zoom
      in={checked.length > 0}
      style={{ transitionDelay: checked ? '250ms' : '0ms' }}
    >
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {checked.length > 0 && (
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              '& .MuiButton-startIcon': {
                mr: 0,
              },
            }}
            endIcon={
              <Box
                component={Paper}
                sx={{
                  display: 'flex',
                  backgroundColor: 'transparent',
                }}
                onClick={(evt) => {
                  evt.stopPropagation();
                  handleClearSelection();
                }}
              >
                <CloseIcon
                  color={
                    theme.palette.mode === 'dark' ? 'primary' : 'secondary'
                  }
                />
              </Box>
            }
          >
            <Typography>Find match</Typography>
            <Typography mx={1}>{'\u00B7'}</Typography>
            <Typography>{checked.length}</Typography>
          </Button>
        )}
      </Stack>
    </Zoom>
  );
};

export default FindMatchSection;
