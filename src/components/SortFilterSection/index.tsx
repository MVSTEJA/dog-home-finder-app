import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';

import { MOBILE_WIDTH_QUERY } from 'src/constants';
import Sorting from './Sorting';
import Filter from './FilterSection';

export const SortFilterSection: FC<{
  handleClearSelection: () => void;
}> = ({ handleClearSelection }) => {
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);
  return (
    <Stack
      component={Paper}
      direction="row"
      justifyContent="flex-start"
      sx={{ p: 2, mx: matches ? 0 : 1 }}
    >
      <Box
        sx={{
          minWidth: '120px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Filter handleClearSelection={handleClearSelection} />
        <Divider
          flexItem
          sx={{ bgcolor: 'lightgrey' }}
          orientation="vertical"
        />
        <Sorting />
      </Box>
    </Stack>
  );
};

export const FindMatchSection = ({
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
        flexBasis="50%"
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

interface FilterSortSectionProps {
  handleClearSelection: () => void;
}

export const FilterSortSection: FC<FilterSortSectionProps> = ({
  handleClearSelection,
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        pl: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexBasis: '75%',
      }}
    >
      <SortFilterSection handleClearSelection={handleClearSelection} />
    </Stack>
  );
};
