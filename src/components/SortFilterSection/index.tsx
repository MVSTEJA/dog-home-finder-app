import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC, Dispatch, SetStateAction } from 'react';
import Sorting from './Sorting';
import Filter from './FilterSection';
import SearchInput from '../SearchInput';

export const SortFilterSection: FC = () => {
  return (
    <Box
      sx={{
        m: 1,
        minWidth: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        p: 1,
        alignItems: 'center',
      }}
    >
      <Filter />
      <Divider flexItem sx={{ bgcolor: 'lightgrey' }} orientation="vertical" />
      <Sorting />
    </Box>
  );
};

interface SearchSectionProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
  checked: string[];
  handleClearSelection: () => void;
  handleClickOpen: () => void;
}
export const SearchSection: FC<SearchSectionProps> = ({
  setSearchValue,
  checked,
  handleClearSelection,
  handleClickOpen,
}) => {
  const appTheme = useTheme();
  return (
    <Grid item xs={12}>
      <SearchInput setSearchValue={setSearchValue} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SortFilterSection />
        <Box display="flex" justifyContent="flex-end">
          {checked.length > 0 && (
            <>
              <Button
                variant="text"
                sx={{
                  mr: 2,
                  '& .MuiButton-startIcon': {
                    mr: 0,
                  },
                }}
                endIcon={
                  <Box
                    sx={{
                      minHeight: '20px',
                      minWidth: '25px',
                      borderRadius: appTheme.shape.borderRadius / 2,
                      bgcolor: appTheme.palette.primary.main,
                      p: 0.5,
                    }}
                  >
                    <Typography color="white">{checked.length}</Typography>
                  </Box>
                }
                onClick={handleClearSelection}
                startIcon={<CloseIcon />}
              />

              <Button variant="contained" onClick={handleClickOpen}>
                Find match
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Grid>
  );
};
