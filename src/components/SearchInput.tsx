import { alpha, styled } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput, Stack } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from 'usehooks-ts';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: 42,
  borderRadius: theme.shape.borderRadius * 12,
  display: 'flex',
  marginLeft: 0,
  width: '100%',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    borderColor: theme.palette.primary.light,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0, 0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: 'inherit',
  height: '100%',
  alignSelf: 'center',
  borderColor: 'transparent',
  boxShadow:
    'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 2px 10px 0px',
  borderRadius: theme.shape.borderRadius * 12,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  [theme.breakpoints.up('md')]: {
    '&.Mui-expanded .MuiInputBase-input': {
      width: '50ch',
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '30ch',
    '&:focus': {
      width: '35ch',
    },
    [theme.breakpoints.up('md')]: {
      '&:focus': {
        width: '50ch',
      },
      '&.Mui-expanded .MuiInputBase-input': {
        width: '50ch',
      },
    },
  },
}));

interface SearchSectionProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchSection: FC<SearchSectionProps> = ({
  setSearchValue,
}: SearchSectionProps) => {
  const [search, setSearch] = useState<string>('');
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    setSearchValue(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleClearSearch = () => {
    setSearch('');
    setSearchValue('');
  };
  return (
    <Stack direction="row" flexBasis="50%" justifyContent="flex-start" p={2}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          value={search}
          placeholder="Search by name, breed, age, zip"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'search' }}
          autoFocus
          className={`${debouncedSearchTerm?.length > 0 ? 'Mui-expanded' : ''}`}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle clear"
                onClick={handleClearSearch}
                onMouseDown={handleClearSearch}
                edge="end"
              >
                {search ? <ClearRoundedIcon /> : ''}
              </IconButton>
            </InputAdornment>
          }
        />
      </Search>
    </Stack>
  );
};

export default SearchSection;
