import React from 'react';
import { Box } from '@mui/material';

import Sorting from './Sorting';
import Filter from './Filter';

const SortFilterSection: React.FC = () => {
  return (
    <Box
      sx={{
        m: 1,
        width: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid grey',
        borderRadius: '12px',
        p: 1,
        alignItems: 'center',
      }}
    >
      <Filter />
      <Sorting />
    </Box>
  );
};

export default SortFilterSection;
