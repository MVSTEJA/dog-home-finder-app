import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SelectChangeEvent, Typography } from '@mui/material';

import CustomizedMenus from './CustomizedMenus';
import CustomIconBtn from '../common/ActionableBtns';
import { usePaginate, usePaginateDispatch } from '../../context/hooks';

const options = [
  { name: 'Ascending', id: 'asc' },
  { name: 'Descending', id: 'desc' },
];

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string, sortBy?: string) => void;
  sortBy: string;
}

const ConfirmationDialogRaw: React.FC<ConfirmationDialogRawProps> = (
  props: ConfirmationDialogRawProps
) => {
  const { onClose, value: valueProp, open, sortBy, ...other } = props;
  const [sortValue, setSortValue] = React.useState<string>(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [sortByValue, setSortByValue] = React.useState<string>(sortBy);
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(sortValue, sortByValue);
  };

  const handleSortByChange = (evt: SelectChangeEvent<string>) => {
    setSortByValue(evt.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>
        <Typography
          gutterBottom
          component="div"
          display="flex"
          alignItems="center"
        >
          <SortByAlphaRoundedIcon sx={{ mr: 1 }} />
          <Box>Sort by </Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <CustomizedMenus
          handleChange={handleSortByChange}
          sortSelected={sortByValue}
          sortMenu={['breed', 'age', 'name']}
        />

        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={sortValue}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.id}
              key={option.name}
              control={<Radio />}
              label={option.name}
            />
          ))}
        </RadioGroup>
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

const Sorting: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { sort: sortValue } = usePaginate();
  const setSortValue = usePaginateDispatch();

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string, sortBy?: string | undefined) => {
    setOpen(false);

    if (newValue) {
      setSortValue({
        id: newValue,
        type: newValue,
        by: sortBy,
      });
    }
  };

  return (
    <>
      <CustomIconBtn
        iconState={sortValue?.id !== ''}
        handleClick={handleClickListItem}
      >
        <SortByAlphaRoundedIcon
          color={sortValue?.id !== '' ? 'secondary' : 'primary'}
        />
      </CustomIconBtn>

      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={sortValue?.id}
        sortBy={sortValue?.by || ''}
      />
    </>
  );
};
export default Sorting;
