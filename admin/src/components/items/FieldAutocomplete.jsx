import React from 'react'
import { Autocompletex, Popperx } from '@assets/styling/style'
import { TextField } from '@mui/material';



function FieldAutocomplete({ Title }) {

    // ====== AUTO COMPLETE ====== 
    const top100Films = [
        { id: 1, label: 'The Shawshank Redemption', year: 1994 },
        { id: 2, label: 'The Godfather', year: 1972 },
        { id: 3, label: 'The Godfather: Part II', year: 1974 },
        { id: 4, label: 'The Dark Knight', year: 2008 },
        { id: 5, label: '12 Angry Men', year: 1957 },
        { id: 6, label: "Schindler's List", year: 1993 },
    ];

    const [value, setValue] = React.useState(top100Films[0]);
    const [inputValue, setInputValue] = React.useState('');
    // ====== AUTO COMPLETE ====== 


    if (Title) {
        // Jika 'Title' ada, kembalikan elemen div dengan title dan Fieldx
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <Autocompletex
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                    size="small"
                    options={top100Films}
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
                onChange={(event, newValue) => setValue(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                size="small"
                options={top100Films}
                PopperComponent={Popperx}
                renderInput={(params) => <TextField {...params} />}
            />
        )
    }
}

export default FieldAutocomplete
