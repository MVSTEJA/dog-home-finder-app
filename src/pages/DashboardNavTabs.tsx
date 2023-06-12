import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Suspense, lazy, useState } from 'react';
import { Box, CircularProgress, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = lazy(() => import('src/pages/FilterSortDashboard'));
const DashboardSearch = lazy(() => import('src/pages/SearchDashboard'));

const TabContent = [<Dashboard key={0} />, <DashboardSearch key={1} />];
const DashboardNavTabs = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs"
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
          mb: 2,
          '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 50,
            width: '100%',
            marginLeft: '25px',
          },
          '& .MuiTabs-indicatorSpan': {},
        }}
      >
        <Tooltip title="Filter/Sort page">
          <Tab icon={<TuneRoundedIcon />} iconPosition="bottom" />
        </Tooltip>
        <Tooltip title="Search Page(Experimental)">
          <Tab icon={<SearchIcon />} iconPosition="bottom" />
        </Tooltip>
      </Tabs>
      <Suspense
        fallback={
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        {TabContent[value]}
      </Suspense>
    </>
  );
};

export default DashboardNavTabs;
