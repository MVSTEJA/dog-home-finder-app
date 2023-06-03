import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { MuiAutocompleteSelectAll } from 'mui-autocomplete-select-all';
import { Breed } from '../../types';

export interface BreedSelectProps {
  options: Breed[] | undefined;
  breeds: Breed[];
  setBreeds: React.Dispatch<React.SetStateAction<Breed[]>>;
}

const BreedSelect: React.FC<BreedSelectProps> = ({
  options = [],
  breeds = [],
  setBreeds = () => {},
}: BreedSelectProps) => {
  const selectedAll = breeds.length === options.length;

  const providerOptions = useMemo(
    () => ({
      onSelectAll: (all) => setBreeds(all ? [] : options),
      selectedAll,
      indeterminate: !!breeds.length && !selectedAll,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAll]
  );

  return (
    <MuiAutocompleteSelectAll.Provider value={providerOptions}>
      <Autocomplete
        value={breeds}
        onChange={(_, newValue) => setBreeds(newValue)}
        disableCloseOnSelect
        multiple
        limitTags={3}
        ListboxComponent={MuiAutocompleteSelectAll.ListBox}
        disablePortal
        options={options}
        renderInput={(params) => (
          <TextField placeholder="Select breed" {...params} />
        )}
        renderOption={(props, option, { selected }) => (
          <li key={option.value} {...props}>
            <Checkbox checked={selected} />
            {option.value}
          </li>
        )}
      />
    </MuiAutocompleteSelectAll.Provider>
  );
};

export default BreedSelect;
