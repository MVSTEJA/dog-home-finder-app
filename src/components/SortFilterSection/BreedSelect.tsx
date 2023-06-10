import { Autocomplete, Checkbox, TextField, debounce } from '@mui/material';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';

import { Breed } from 'src/types';
import GetHighlightedText from 'src/utils/highlight-text';
import MuiAutocompleteSelectAll from 'src/components/common/MuiAutocompleteSelectAll';

export interface BreedSelectProps {
  options: Breed[] | undefined;
  breeds: Breed[];
  setBreeds: Dispatch<SetStateAction<[] | Breed[]>>;
}

interface ProviderOptions {
  onSelectAll: (all: boolean) => undefined;
  selectedAll: boolean;
}

const BreedSelect: FC<BreedSelectProps> = ({
  options = [],
  breeds = [],
  setBreeds = () => {},
}: BreedSelectProps) => {
  const selectedAll = breeds.length === options.length;
  const [inputValue, setInputValue] = useState<string>('');

  const providerOptions: ProviderOptions = useMemo(
    () => ({
      onSelectAll: (all: boolean) => {
        setBreeds(all ? [] : options);
        return undefined;
      },
      selectedAll,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAll]
  );

  return (
    <MuiAutocompleteSelectAll.Provider value={providerOptions}>
      <Autocomplete
        value={breeds}
        onChange={(_, newValue) => {
          setBreeds(newValue);
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableCloseOnSelect
        multiple
        data-testid="autocomplete-search"
        limitTags={3}
        ListboxComponent={MuiAutocompleteSelectAll.ListBox}
        disablePortal
        options={options}
        onInput={debounce((evt) => {
          setInputValue(evt.target.value);
        }, 200)}
        renderInput={(params) => (
          <TextField placeholder="Search breed and select..." {...params} />
        )}
        renderOption={(props, option, { selected }) => (
          <li key={option.value} {...props}>
            <Checkbox checked={selected} />
            <GetHighlightedText highlight={inputValue} text={option.value} />
          </li>
        )}
      />
    </MuiAutocompleteSelectAll.Provider>
  );
};

export default BreedSelect;
