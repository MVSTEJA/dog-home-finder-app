import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';

interface CustomizedMenusProps {
  sortSelected: string;
  sortMenu: string[];
}

const CustomizedMenus: React.FC<CustomizedMenusProps> = ({
  sortSelected,
  sortMenu,
}: CustomizedMenusProps) => {
  const handleChange = () => {};

  return (
    <FormControl fullWidth sx={{ mb: 1 }}>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortSelected}
        label="Sort By"
        onChange={handleChange}
        size="small"
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
