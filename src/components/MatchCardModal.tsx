import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FC, useCallback, useEffect, useState } from 'react';
import { findMatch } from 'src/api';

import DogDelivery from 'src/assets/being-happy-1.svg';
import { Dog } from 'src/types';
import { MOBILE_WIDTH_QUERY } from 'src/constants';
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';
import queryClient from 'src/queryClient';

import AnimatedFigure from './common/AnimatedFigure';
import { PetCardContent } from './PetCard';

interface MatchCardModalProps {
  handleClose: () => void;
  modalOpen: boolean;
  cardChecked: string[];
  allCards: Dog[] | undefined;
}

const MatchCardModal: FC<MatchCardModalProps> = ({
  handleClose,
  modalOpen,
  cardChecked,
  allCards,
}: MatchCardModalProps) => {
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);
  const [isLargeExploding, setIsLargeExploding] = useState<boolean>(false);
  const { data, mutate, isLoading } = useMutation({
    mutationKey: ['petMatch'],
    mutationFn: (checked: string[]) => findMatch(checked),
    onSuccess: () => {
      setIsLargeExploding(true);
    },
  });

  const handleMutate = useCallback(() => {
    if (modalOpen) {
      mutate(cardChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  useEffect(() => {
    if (!modalOpen) {
      setIsLargeExploding(false);
    } else {
      handleMutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const matchCardData = allCards?.filter((cardData) => {
    return cardData.id === data?.match;
  })[0];

  const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 8000,
    particleCount: 500,
    width: 1600,
    zIndex: 1301,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
    onComplete: () => {
      setIsLargeExploding(false);
    },
  };

  const modalClose = () => {
    queryClient.removeQueries({ queryKey: ['petMatch'] });

    handleClose();
  };

  return (
    <Dialog
      onClose={modalClose}
      aria-labelledby="customized-dialog-title"
      open={modalOpen}
      maxWidth={matches ? 'md' : 'xl'}
      fullScreen={!matches}
    >
      <DialogContent
        dividers
        sx={{
          padding: 0,
        }}
      >
        {isLargeExploding && <ConfettiExplosion {...largeProps} />}
        {isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            width="40vh"
            height="30vh"
          >
            <CircularProgress />
            <Typography variant="h6" textAlign="center" gutterBottom>
              Finding a pet for you...
            </Typography>
          </Stack>
        ) : (
          <Card variant="outlined">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'relative',
                  right: 0,
                  marginRight: '0',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <CardContent sx={{ pb: 0, display: 'flex', flexFlow: 'column' }}>
              {matchCardData ? (
                <Stack
                  alignItems="center"
                  flexDirection={`${matches ? 'row' : 'column'}`}
                >
                  <Box sx={{ bgcolor: 'AppWorkspace', borderRadius: 3 }}>
                    <Typography
                      sx={{ textAlign: 'center', flex: 2, m: 1 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Yay! Found a pet.
                    </Typography>
                    <AnimatedFigure
                      PetImage={DogDelivery}
                      height={200}
                      width={200}
                    />
                  </Box>
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ mx: 2, borderWidth: 1, my: 2 }}
                  />
                  <Box width={250}>
                    <PetCardContent
                      img={matchCardData?.img}
                      breed={matchCardData?.breed}
                      age={matchCardData?.age}
                      name={matchCardData?.name}
                      zipCode={matchCardData?.zip_code}
                    />
                  </Box>
                </Stack>
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MatchCardModal;
