import { Box, Divider, Paper, Stack, useTheme } from '@mui/material';
import { FC } from 'react';

import Sorting from './Sorting';
import Filter from './FilterSection';

export const SortFilterSection: FC<{
  handleClearSelection: () => void;
}> = ({ handleClearSelection }) => {
  const appTheme = useTheme();

  return (
    <Stack
      component={Paper}
      direction="row"
      justifyContent="flex-start"
      sx={{ p: 2, mx: appTheme.breakpoints.up('sm') ? 0 : 1 }}
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
