import React from 'react'
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Search } from '@mui/icons-material';
import { Fieldx } from '@assets/styling/style'



function FieldWithButton({ Title, placeholderx }) {
    // Periksa apakah properti 'Title' ada (tidak null, undefined, atau string kosong)
    if (Title) {
        // Jika 'Title' ada, kembalikan elemen div dengan title dan Fieldx
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <Fieldx
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder={placeholderx}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
        )
    } else {
        // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
        return (
            <Fieldx
                fullWidth
                variant="outlined"
                size="small"
                placeholder={placeholderx}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        )
    }
}

export default FieldWithButton
