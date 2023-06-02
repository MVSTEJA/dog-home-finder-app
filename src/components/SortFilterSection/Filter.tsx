import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { findAllBreeds } from '../../api';
import { useFilter, useFilterDispatch } from '../../context/FilterProvider';
import BreedSelect from './BreedSelect';
import LocationSelect from './LocationSelect';
import CustomIconBtn from '../common/ActionableBtns';

export interface FilterDialogContainerProps {
  id: string;
  keepMounted: boolean;
  filterValue: string[];
  open: boolean;
  onClose: (value?: string[]) => void;
}

const FilterDialogContainer: React.FC<FilterDialogContainerProps> = (
  props: FilterDialogContainerProps
) => {
  const { onClose, filterValue, open, ...other } = props;
  const { data: options } = useQuery({
    queryKey: ['findAllBreeds'],
    queryFn: findAllBreeds,
  });

  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [personName, setPersonName] = React.useState<string[]>(filterValue);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(personName);
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
        <Box display="flex" alignItems="center" mb={2}>
          <TuneRoundedIcon sx={{ mr: 1 }} />
          <Box>Filter</Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          overflow: 'visible',
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
        <BreedSelect options={options} setPersonName={setPersonName} />
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
        <LocationSelect />
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

const Filter: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const filterValue = useFilter();
  const setFilterValue = useFilterDispatch();
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (value?: string[] | undefined) => {
    setOpen(false);

    if (value) {
      setFilterValue({
        type: 'add_breed',
        breeds: value,
      });
    }
  };

  return (
    <>
      {/* <Box
        sx={{
          bgcolor: theme.palette.secondary.light,
          borderRadius: theme.shape.borderRadius / 2,
        }}
      > */}
      <CustomIconBtn
        iconState={filterValue.filterBreeds.length > 0}
        handleClick={handleClickListItem}
      >
        <TuneRoundedIcon />
      </CustomIconBtn>
      {/* </Box> */}
      <FilterDialogContainer
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        filterValue={filterValue.filterBreeds}
      />
    </>
  );
};

export default Filter;
