import FilterListIcon from '@mui/icons-material/FilterList';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import { IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import ReactSelect, {
  components,
  MenuListProps,
  MultiValue,
} from 'react-select';

import { findAllBreeds } from '../../api';
import { useFilter, useFilterDispatch } from '../../context/FilterProvider';
import { Breed } from '../../types';

export interface MultipleSelectChipProps {
  options: Breed[] | undefined;
  setPersonName: React.Dispatch<React.SetStateAction<string[]>>;
}
const menuHeaderStyle = {
  padding: '8px 12px',
  background: 'rgba(0, 0, 0, 0.16)',
  color: 'white',
};

const MenuList = ({ children, ...props }: MenuListProps) => {
  return (
    <components.MenuList {...props}>
      {/* <div style={menuHeaderStyle}>Custom Menu List</div> */}
      {children}
    </components.MenuList>
  );
};

export const ExternalSelect = ({
  options,
  setPersonName,
}: MultipleSelectChipProps) => {
  const handleChnage = (newValue: MultiValue<unknown>) => {
    setPersonName(newValue.map((str: any) => str.value));
  };
  return (
    <ReactSelect
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      closeMenuOnSelect={false}
      components={{ MenuList }}
      onChange={handleChnage}
      theme={(theme) => ({
        ...theme,
        borderRadius: 12,
        colors: {
          ...theme.colors,
          primary: '#890075',
        },
      })}
    />
  );
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  filterValue: string[];
  open: boolean;
  onClose: (value?: string[]) => void;
}

const ConfirmationDialogRaw = (props: ConfirmationDialogRawProps) => {
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
      <DialogTitle>Filter by breed</DialogTitle>
      <DialogContent
        dividers
        sx={{
          minHeight: '200px',
          overflow: 'visible',
        }}
      >
        <ExternalSelect options={options} setPersonName={setPersonName} />
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
      <Box>
        <IconButton onClick={handleClickListItem} size="small">
          <FilterListIcon />
        </IconButton>
      </Box>
      <ConfirmationDialogRaw
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
