import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { findMatch } from '../api';
import DogCard from './DogCard';
import { Dog } from '../types';

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

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={modalOpen}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogContent
        dividers
        sx={{
          padding: '0 !important',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {isLoading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        <Card
          variant="outlined"
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>
            {matchCardData ? (
              <>
                <Typography
                  sx={{ textAlign: 'center' }}
                  color="text.primary"
                  gutterBottom
                >
                  Match found !
                </Typography>
                <DogCard
                  img={matchCardData?.img}
                  breed={matchCardData?.breed}
                  name={matchCardData?.name}
                  zipCode={matchCardData?.zipCode}
                  value={matchCardData?.id}
                />
              </>
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
