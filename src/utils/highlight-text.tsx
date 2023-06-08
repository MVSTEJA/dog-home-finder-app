import { Box } from '@mui/material';
import { FC } from 'react';

const GetHighlightedText: FC<{ text: string; highlight: string }> = ({
  text,
  highlight,
}) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  if (!highlight || highlight === '') {
    return <span>{text}</span>;
  }
  return (
    <span>
      {' '}
      {parts.map((part) => (
        <Box
          component="span"
          key={part}
          sx={
            part.toLowerCase() === highlight.toLowerCase()
              ? {
                  backgroundColor: 'yellow',
                  color: 'black',
                }
              : {}
          }
        >
          {part}
        </Box>
      ))}{' '}
    </span>
  );
};

export default GetHighlightedText;
