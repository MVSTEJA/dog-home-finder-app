import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import { Box, Fab, Fade, Tooltip } from '@mui/material';
import { FC } from 'react';

interface BackToTopProps {
  trigger: boolean;
  handleScrollToTop: () => void;
}

const BackToTop: FC<BackToTopProps> = ({
  trigger,
  handleScrollToTop,
}: BackToTopProps) => {
  const handleClick = () => {
    handleScrollToTop();
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
