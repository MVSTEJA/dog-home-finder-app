import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Box, Card, CardContent, Divider, useMediaQuery } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { findMatch } from '../api';
import successAnimation from '../lotties/91540-dog-love.json';
import { Dog } from '../types';
import { DogCardContent } from './DogCard';
import AnimatedFigure from './common/AnimatedFigure';
import PetLoader from './common/PetLoader';

interface MatchCardModalProps {
  handleClose: () => void;
  modalOpen: boolean;
  cardChecked: string[];
  allCards: Dog[] | undefined;
}

const MatchCardModal: React.FC<MatchCardModalProps> = ({
  handleClose,
  modalOpen,
  cardChecked,
  allCards,
}: MatchCardModalProps) => {
  const { data, mutate, isLoading } = useMutation({
    mutationFn: (checked: string[]) => findMatch(checked),
  });

  const handleMutate = React.useCallback(() => {
    if (modalOpen) {
      mutate(cardChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  React.useEffect(() => {
    handleMutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const matchCardData = allCards?.filter((cardData) => {
    return cardData.id === data?.match;
  })[0];

  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={modalOpen}
      maxWidth="md"
    >
      <DialogContent
        dividers
        sx={{
          padding: 0,
        }}
      >
        {isLoading && (
          <Box display="flex" justifyContent="center" width={100} height={200}>
            <PetLoader />
          </Box>
        )}

        <Card variant="outlined">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'relative',
                right: 0,
                marginRight: '0',
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <CardContent sx={{ pb: 0, display: 'flex', flexFlow: 'column' }}>
            {matchCardData ? (
              <Box
                display="flex"
                alignItems="center"
                flexDirection={`${matches ? 'row' : 'column'}`}
              >
                <Box>
                  <Typography
                    sx={{ textAlign: 'center', flex: 2, m: 1 }}
                    color="text.primary"
                    gutterBottom
                  >
                    Yay! Found a dog.
                  </Typography>
                  <AnimatedFigure
                    animationData={successAnimation as Record<string, unknown>}
                    height={200}
                    width={200}
                  />
                </Box>
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={{ mx: 2, borderWidth: 1 }}
                />
                <Box width={250}>
                  <DogCardContent
                    img={matchCardData?.img}
                    breed={matchCardData?.breed}
                    age={matchCardData?.age}
                    name={matchCardData?.name}
                    zipCode={matchCardData?.zip_code}
                    matches={matches}
                  />
                </Box>
              </Box>
            ) : (
              <Typography
                sx={{ textAlign: 'center', verticalAlign: 'center' }}
                color="text.primary"
              >
                No Match found !
              </Typography>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default MatchCardModal;
