import { Box } from '@mui/material';
import { FC } from 'react';

interface AnimatedFigureProps {
  height?: number | string;
  width?: number | string;
  PetImage: any;
}
const AnimatedFigure: FC<AnimatedFigureProps> = ({
  height = 100,
  width = 100,
  PetImage,
}) => {
  return (
    <Box>
      <img
        alt="petloader"
        src={PetImage}
        width={width}
        height={height}
        loading="lazy"
      />
    </Box>
  );
};
export default AnimatedFigure;
