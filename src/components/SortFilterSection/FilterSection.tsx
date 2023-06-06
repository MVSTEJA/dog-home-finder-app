import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Dispatch, FC, useRef, useState } from 'react';
import { findAllBreeds } from 'src/api';
import { FilterAction } from 'src/context/FilterProvider';
import { useFilter, useFilterDispatch } from 'src/context/hooks';
import { Breed, Filter, Place } from 'src/types';
import CustomIconBtn from 'src/components/common/ActionableBtns';
import BreedSelect from './BreedSelect';
import LocationSelect from './LocationSelect';

export interface FilterDialogContainerProps {
  id: string;
  keepMounted: boolean;
  filterValue: Filter;
  open: boolean;
  onClose: (value?: Filter) => void;
  setFilterValue: Dispatch<FilterAction>;
}

const FilterDialogContainer: FC<FilterDialogContainerProps> = (
  props: FilterDialogContainerProps
) => {
  const { onClose, filterValue, open, setFilterValue, ...other } = props;

  const { data: options } = useQuery({
    queryKey: ['findAllBreeds'],
    queryFn: () => findAllBreeds(filterValue),
  });

  const radioGroupRef = useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const [breeds, setBreeds] = useState<Breed[]>(filterValue.breeds);
  const [place, setPlace] = useState<Place>(filterValue.place);

  const handleOk = () => {
    onClose({
      breeds,
      place,
    });
  };
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          minHeight: 200,
          overflow: 'visible',
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" mb={1}>
          <TuneRoundedIcon sx={{ mr: 1 }} />
          <Box>Filter</Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <Typography
          gutterBottom
          component="div"
          display="flex"
          alignItems="center"
        >
          <PetsRoundedIcon sx={{ mr: 1 }} />
          <Box>Breeds</Box>
        </Typography>
        <BreedSelect
          options={options?.breeds}
          breeds={breeds}
          setBreeds={setBreeds}
        />
        <br />
        <Typography
          gutterBottom
          component="div"
          display="flex"
          alignItems="center"
        >
          <MapOutlinedIcon sx={{ mr: 1 }} />
          <Box>Location</Box>
        </Typography>
        <LocationSelect place={place} setPlace={setPlace} />
      </DialogContent>
      <DialogActions sx={{ mr: 1, mb: 1 }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleOk}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FilterSection: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const filterValue = useFilter();
  const setFilterValue = useFilterDispatch();
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (value?: Filter | undefined) => {
    setOpen(false);

    if (value) {
      setFilterValue({
        ...filterValue,
        type: 'mutate',
        ...value,
      });
    }
  };

  return (
    <>
      <CustomIconBtn
        iconState={filterValue?.breeds?.length > 0}
        handleClick={handleClickListItem}
        color="primary"
      >
        <TuneRoundedIcon color="primary.light" />
      </CustomIconBtn>
      <FilterDialogContainer
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
    </>
  );
};

export default FilterSection;
