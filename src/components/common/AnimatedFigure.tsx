import { Box } from '@mui/material';

interface AnimatedFigureProps {
  height?: number | string;
  width?: number | string;
  PetImage: any;
}
const AnimatedFigure = ({
  height = 100,
  width = 100,
  PetImage,
}: AnimatedFigureProps) => {
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
