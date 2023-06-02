import { Autocomplete, TextField } from '@mui/material';
import { Breed } from '../../types';

export interface MultipleSelectChipProps {
  options: readonly Breed[];
  setPersonName: React.Dispatch<React.SetStateAction<string[]>>;
}

const BreedSelect: React.FC<MultipleSelectChipProps> = ({
  options,
  setPersonName,
}: MultipleSelectChipProps) => {
  const handleChnage = (event: any, newValue: Breed[]) => {
    setPersonName(newValue?.map((str: Breed) => str.value));
  };
  return (
    <Autocomplete
      multiple
      id="size-small-outlined-multi"
      size="medium"
      options={options || []}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select..." />
      )}
      onChange={handleChnage}
    />
  );
};

export default BreedSelect;
