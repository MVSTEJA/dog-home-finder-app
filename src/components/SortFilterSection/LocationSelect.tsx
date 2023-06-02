import { Autocomplete, TextField } from '@mui/material';

import React from 'react';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const LocationSelect = () => {
  const [place, setPlace] = React.useState<string>('');

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesAutocompleteService({
      options: {
        componentRestrictions: { country: 'us' },
      },
      apiKey: import.meta.env.VITE_REACT_APP_GOOGLE,
    });

  const handleSearch = (search: string) => {
    getPlacePredictions({
      input: search,
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };
  const handleInput = (
    evt: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    const termsCityStateCountry = [...newValue.terms].reverse().slice(0, 3);
    termsCityStateCountry.shift();
    console.log(termsCityStateCountry);

    setPlace(newValue.description);
  };
  return (
    <Autocomplete
      inputValue={place}
      options={placePredictions}
      getOptionLabel={(option) => option.description}
      onChange={handleInput}
      onClose={() => {
        handleSearch('');
      }}
      loading={isPlacePredictionsLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onChange={handleChange}
          name="places"
          id="places-input"
          variant="outlined"
        />
      )}
    />
  );
};

export default LocationSelect;
