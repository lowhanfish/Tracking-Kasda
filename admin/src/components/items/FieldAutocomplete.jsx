import { useState, useEffect } from 'react'
import { Autocompletex, Popperx } from '@assets/styling/style'
import { TextField } from '@mui/material';

// Data default untuk FieldAutocomplete
const DEFAULT_OPTIONS = [
    { id: 1, label: 'The Shawshank Redemption', year: 1994 },
    { id: 2, label: 'The Godfather', year: 1972 },
    { id: 3, label: 'The Godfather: Part II', year: 1974 },
    { id: 4, label: 'The Dark Knight', year: 2008 },
    { id: 5, label: '12 Angry Men', year: 1957 },
    { id: 6, label: "Schindler's List", year: 1993 },
];

function FieldAutocomplete({
    Title = "",
    name = '',
    value = null,
    onChange = () => { },
    options = DEFAULT_OPTIONS,
    getOptionLabel = (option) => option.label || ''
}) {

    // ====== AUTO COMPLETE ====== 
    const [inputValue, setInputValue] = useState('');
    // ====== AUTO COMPLETE ====== 

    if (Title) {
        // Jika 'Title' ada, kembalikan elemen div dengan title dan Fieldx
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <Autocompletex
                    value={value}
                    onChange={(event, newValue) => onChange(event, newValue)}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                    size="small"
                    options={options}
                    getOptionLabel={getOptionLabel}
                    PopperComponent={Popperx}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        )
    } else {
        // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
        return (
            <Autocompletex
                value={value}
                onChange={(event, newValue) => onChange(event, newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                size="small"
                options={options}
                getOptionLabel={getOptionLabel}
                PopperComponent={Popperx}
                renderInput={(params) => <TextField {...params} />}
            />
        )
    }
}

export default FieldAutocomplete
