import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';

interface CustomizedMenusProps {
  sortSelected: string;
  sortMenu: string[];
  handleChange: (evt: SelectChangeEvent<string>) => void;
}

const CustomizedMenus: FC<CustomizedMenusProps> = ({
  sortSelected,
  sortMenu,
  handleChange,
}: CustomizedMenusProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 1 }}>
      <Select
        labelId="select-label"
        id="select"
        value={sortSelected}
        onChange={handleChange}
      >
        {sortMenu?.map((item) => (
          <MenuItem key={item} value={item} disableRipple>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomizedMenus;
