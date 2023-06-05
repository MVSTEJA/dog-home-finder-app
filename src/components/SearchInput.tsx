import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput } from '@mui/material';
import { useDebounce } from 'usehooks-ts';
import {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
} from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: 42,
  borderRadius: theme.shape.borderRadius * 12,
  display: 'flex',
  marginLeft: 0,
  width: '100%',
  borderColor: 'white',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
  width: '100%',
  height: '100%',
  alignSelf: 'center',
  borderColor: 'transparent',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  boxShadow:
    'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 2px 10px 0px',
  borderRadius: theme.shape.borderRadius * 12,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
}));

interface SearchInputProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchInput: FC<SearchInputProps> = ({
  setSearchValue,
}: SearchInputProps) => {
  const [search, setSearch] = useState<string>('');
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    setSearchValue(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search by name, breed, age, zip"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'search' }}
          autoFocus
        />
      </Search>
    </Box>
  );
};

export default SearchInput;
