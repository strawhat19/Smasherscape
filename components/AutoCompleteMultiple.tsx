import { useState } from 'react';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Chip, TextField } from '@mui/material';

export default function AutoCompleteMultiple(props) {
  let [selections, setSelections] = useState<string[]>([]);

  const handleChange = (event: React.SyntheticEvent, 
    value: string,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string>) => {
    setSelections([value]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let input = event.target as HTMLInputElement;
    if (event.key === `Enter`) {
      let newValue = input.value;
      if (newValue) {
        setSelections(prev => [...prev, newValue]);
        input.value = ``; 
      }
    }
  };

  return (
    <>
      <Autocomplete
        options={[`John`, `Sarah`]}
        onChange={handleChange}
        renderTags={(selected: string[]) => (
          selected.map(option => (
            <Chip key={option} label={option} />
          ))
        )}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            onKeyDown={handleKeyDown}
          />
        )}
      />
      {selections.map(selection => (
        <div key={selection}>{selection}</div>
      ))}
    </>
  );
}