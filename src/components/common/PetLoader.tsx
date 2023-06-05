import { Box } from '@mui/material';

import { Ref } from 'react';
import AnimatedFigure from './AnimatedFigure';
import PetImage from '../../assets/golden-retriever-unscreen.gif';

const PetLoader = ({
  width = '100px',
  height = '',
  position = 'relative',
  refProp = null,
}: {
  width?: string;
  height?: string;
  position?: string;
  refProp?: Ref<unknown>;
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
      ref={refProp}
    >
      <AnimatedFigure PetImage={PetImage} />
    </Box>
  );
};

export default PetLoader;
