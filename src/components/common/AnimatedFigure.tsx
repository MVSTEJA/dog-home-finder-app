import { Box } from '@mui/material';
import { Ref } from 'react';
import Lottie from 'react-lottie';

interface AnimatedFigureProps {
  animationData?: Record<string, unknown>;
  loop?: boolean;
  autoplay?: boolean;
  height?: number | string;
  width?: number | string;
  scaleValue?: number;
  refProp?: Ref<unknown>;
}
const AnimatedFigure = ({
  animationData = {},
  loop = true,
  autoplay = true,
  height = 100,
  width = 100,
  scaleValue = 1,
  refProp = null,
}: AnimatedFigureProps) => {
  const defaultOptions = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box sx={{ scale: `${scaleValue}` }} ref={refProp}>
      <Lottie options={defaultOptions} height={height} width={width} />
    </Box>
  );
};
export default AnimatedFigure;
