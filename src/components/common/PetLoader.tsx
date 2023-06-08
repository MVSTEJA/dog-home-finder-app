import { Box } from '@mui/material';

import { FC, Ref } from 'react';
import PetImage from 'src/assets/golden-retriever-unscreen.gif';
import AnimatedFigure from './AnimatedFigure';

const PetLoader: FC<{
  width?: string;
  height?: string;
  position?: string;
  refProp?: Ref<unknown>;
}> = ({
  width = '100px',
  height = '',
  position = 'relative',
  refProp = null,
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
