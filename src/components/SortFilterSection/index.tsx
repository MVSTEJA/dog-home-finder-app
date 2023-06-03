import React from 'react';
import { Box, Divider } from '@mui/material';

import Sorting from './Sorting';
import Filter from './FilterSection';

const SortFilterSection: React.FC = () => {
  return (
    <Box
      sx={{
        m: 1,
        minWidth: '120px',
        display: 'flex',
        justifyContent: 'space-between',

        p: 1,
        alignItems: 'center',
      }}
    >
      <Filter />
      <Divider flexItem sx={{ bgcolor: 'lightgrey' }} orientation="vertical" />
      <Sorting />
    </Box>
  );
};

export default SortFilterSection;
