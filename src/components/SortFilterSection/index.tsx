import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC, Dispatch, SetStateAction } from 'react';
import SearchInput from 'src/components/SearchInput';

import Sorting from './Sorting';
import Filter from './FilterSection';

export const SortFilterSection: FC<{
  handleClearSelection: () => void;
}> = ({ handleClearSelection }) => {
  return (
    <Box
      sx={{
        minWidth: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Filter handleClearSelection={handleClearSelection} />
      <Divider flexItem sx={{ bgcolor: 'lightgrey' }} orientation="vertical" />
      <Sorting />
    </Box>
  );
};

export const FindMatchSection = ({
  checked,
  handleClickOpen,
  handleClearSelection,
}: {
  checked: string[];
  handleClickOpen: () => void;
  handleClearSelection: () => void;
}) => {
  const theme = useTheme();
  return (
    <Stack
      flexBasis="50%"
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
    >
      {checked.length > 0 && (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            '& .MuiButton-startIcon': {
              mr: 0,
            },
          }}
          endIcon={
            <Box
              component={Paper}
              sx={{
                display: 'flex',
                backgroundColor: 'transparent',
              }}
              onClick={(evt) => {
                evt.stopPropagation();
                handleClearSelection();
              }}
            >
              <CloseIcon
                color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
              />
            </Box>
          }
        >
          <Typography>Find match</Typography>
          <Typography mx={1}>{'\u00B7'}</Typography>
          <Typography>{checked.length}</Typography>
        </Button>
      )}
    </Stack>
  );
};

interface SearchSectionProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleClearSelection: () => void;
}
export const SearchSection: FC<SearchSectionProps> = ({
  setSearchValue,
  handleClearSelection,
}) => {
  return (
    <Grid container item xs={12}>
      <Stack
        direction="row"
        sx={{
          pl: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexBasis: '50%',
        }}
      >
        <SortFilterSection handleClearSelection={handleClearSelection} />
      </Stack>
      <SearchInput setSearchValue={setSearchValue} />
    </Grid>
  );
};
