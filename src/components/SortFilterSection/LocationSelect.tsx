import { Autocomplete, TextField } from '@mui/material';
import cloneDeep from 'lodash.clonedeep';

import React, { Dispatch, SetStateAction } from 'react';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { Place } from '../../types';

export interface LocationSelectProps {
  place: Place;
  setPlace: Dispatch<SetStateAction<Place>>;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  place,
  setPlace,
}: LocationSelectProps) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesAutocompleteService({
      options: {
        componentRestrictions: { country: 'us' },
      },
      apiKey: import.meta.env.VITE_REACT_APP_GOOGLE,
    });

  const handleSearch = (search: string) => {
    setPlace({
      ...place,
      city: search,
    });
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
    if (newValue) {
      const termsCityStateCountry = cloneDeep(newValue.terms)
        .reverse()
        .slice(0, 3);
      termsCityStateCountry.shift();
      const [{ value: state }, { value: city }] = termsCityStateCountry;

      setPlace({
        ...place,
        ...{
          description: newValue.description,
          city,
          state,
        },
      });
    } else {
      setPlace({
        ...place,
        ...{
          description: '',
          city: '',
          state: '',
        },
      });
    }
  };

  return (
    <Autocomplete
      inputValue={place.description}
      options={placePredictions}
      getOptionLabel={(option) => option.description}
      onChange={handleInput}
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
