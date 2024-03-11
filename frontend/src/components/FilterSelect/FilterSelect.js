import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterSelect = ({ options, text, multiSelect, filterValues, setFilterValues }) =>  {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (!multiSelect && value === 'clear') setFilterValues('')
    else 
    setFilterValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const updatedOptions = multiSelect ? options : options.concat(['clear'])

  return (
    <div>
      <FormControl sx={{ m: 1, width: '17vw' }}>
        <InputLabel id="demo-multiple-name-label">{text}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple={multiSelect}
          value={filterValues}
          onChange={handleChange}
          input={<OutlinedInput label={text} />}
          MenuProps={MenuProps}
        >
          {updatedOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option === 'clear' ? "clear selection" : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterSelect