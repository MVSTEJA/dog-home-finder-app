import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Dispatch, FC, useEffect, useRef, useState } from 'react';
import { findAllBreeds } from 'src/api';
import { FilterAction, initialFilter } from 'src/context/FilterProvider';
import {
  useFilter,
  useFilterDispatch,
  usePaginateDispatch,
} from 'src/context/hooks';
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

  const [breeds, setBreeds] = useState<Breed[]>(filterValue.breeds);
  const [place, setPlace] = useState<Place>(filterValue.place);

  const handleOk = () => {
    onClose({
      breeds,
      place,
    });
  };
  const handleData = () => {
    if (filterValue.breeds) {
      setBreeds(filterValue.breeds);
    }
    if (filterValue.place.city) {
      setPlace(filterValue.place);
    }
  };
  const handleReset = () => {
    setBreeds([]);

    setPlace(initialFilter.place);
  };
  useEffect(() => {
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterValue)]);
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box display="flex" alignItems="center">
            <TuneRoundedIcon sx={{ mr: 1 }} />
            Filter
          </Box>
          <IconButton
            aria-label="close"
            onClick={() => onClose()}
            sx={{
              position: 'relative',
              right: 0,
              marginRight: '0',
            }}
          >
            <CloseIcon />
          </IconButton>
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
        <Button onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={handleOk}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FilterSection: FC<{
  handleClearSelection: () => void;
}> = ({ handleClearSelection }) => {
  const [open, setOpen] = useState<boolean>(false);
  const filterValue = useFilter();
  const setFilterValue = useFilterDispatch();
  const setPaginateValue = usePaginateDispatch();
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (value?: Filter | undefined) => {
    setOpen(false);

    if (value) {
      setPaginateValue({
        type: 'next_page',
        from: 1,
      });
      setFilterValue({
        ...filterValue,
        type: 'mutate',
        ...value,
      });
    }
  };

  const breedLength = filterValue?.breeds?.length;
  const iconState = breedLength > 0 || filterValue?.place?.description;
  let selectedText = '';

  if (breedLength > 0) {
    selectedText += `${breedLength?.toString()}`;
  }
  if (filterValue?.place?.description || filterValue?.place?.city) {
    selectedText += breedLength > 0 ? ', ' : '';
    selectedText += `${
      filterValue?.place?.description
        ? filterValue?.place?.description
        : filterValue?.place?.city
    }`;
  }

  return (
    <>
      <CustomIconBtn
        iconState={iconState}
        handleClick={handleClickListItem}
        color="secondary"
        sx={{ mr: 1 }}
        /* @ts-expect-error imported type issue. */
        startIcon={<TuneRoundedIcon color="secondary.light" />}
        btnText="Filter"
        selectedText={selectedText}
        clearAction={() => {
          setPaginateValue({
            type: 'next_page',
            from: 1,
          });
          setFilterValue({
            ...filterValue,
            type: 'clear',
          });
          handleClearSelection();
        }}
        showClose
      />
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
