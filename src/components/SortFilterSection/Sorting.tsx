import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IconButton } from '@mui/material';
import {
  usePaginate,
  usePaginateDispatch,
} from '../../context/PaginateProvider';
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

const ConfirmationDialogRaw: React.FC<ConfirmationDialogRawProps> = (
  props: ConfirmationDialogRawProps
) => {
  const { onClose, value: valueProp, open, sortBy, ...other } = props;
  const [value, setValue] = React.useState<string>(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value, sortBy);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Sort by breed</DialogTitle>
      <DialogContent dividers>
        <CustomizedMenus sortSelected={sortBy} sortMenu={['breed']} />
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
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
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
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
      <Box>
        <IconButton
          size="small"
          onClick={handleClickListItem}
          sx={{
            transform: 'rotate(90deg)',
            backgroundColor: 'grey',
          }}
        >
          <SyncAltIcon />
        </IconButton>
      </Box>
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
