import { Ref } from 'react';
import { Box } from '@mui/material';
import dogStepsAnimation from '../../lotties/paw-loading.json';
import AnimatedFigure from './AnimatedFigure';

const PetLoader = ({
  refProp = null,
  width = '100px',
  height = '',
  position = 'relative',
}: {
  width?: string;
  height?: string;
  refProp?: Ref<unknown>;
  position?: string;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignSelf="center"
      alignItems="center"
      width={width}
      height={height}
      sx={{
        position,
      }}
    >
      <AnimatedFigure
        refProp={refProp}
        animationData={dogStepsAnimation as Record<string, unknown>}
      />
    </Box>
  );
};

export default PetLoader;
