import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { FC, useState, useRef, ChangeEvent } from 'react';
import { usePaginate, usePaginateDispatch } from 'src/context/hooks';
import CustomIconBtn from 'src/components/common/ActionableBtns';
import CustomizedMenus from './CustomizedMenus';

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

const ConfirmationDialogRaw: FC<ConfirmationDialogRawProps> = (
  props: ConfirmationDialogRawProps
) => {
  const { onClose, value: valueProp, open, sortBy, ...other } = props;
  const [sortValue, setSortValue] = useState<string>(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);
  const [sortByValue, setSortByValue] = useState<string>(sortBy);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

const Sorting: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

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
        color="secondary"
        sx={{ ml: 1 }}
        /* @ts-expect-error inherent type issue. */
        startIcon={<SortByAlphaRoundedIcon color="secondary.light" />}
        btnText="Sort by"
        selectedText={sortValue.by}
      />

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
