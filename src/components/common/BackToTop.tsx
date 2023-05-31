import * as React from 'react';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import { Fade } from '@mui/material';

const BackToTop = ({ trigger, handleScrollToTop }) => {
  const handleClick = () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    handleScrollToTop(handleScrollToTop);
  };
  return (
    <Fade in={trigger}>
      <Tooltip title="Scroll to top">
        <Box
          className="mui-fixed"
          sx={{
            position: `fixed`,
            bottom: 16,
            right: 16,
            zIndex: `99`,
          }}
        >
          <Fab
            size="large"
            aria-label="backToTop"
            onClick={handleClick}
            data-ga-event-category="docs"
            data-ga-event-action="click-back-to-top"
          >
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Box>
      </Tooltip>
    </Fade>
  );
};
export default BackToTop;
