import React from 'react'
import { Fieldx, FieldxKamio } from '@assets/styling/style'
import stylex from '@assets/styling/stylex'


function FieldSingle({ Title }) {
    // Periksa apakah properti 'Title' ada (tidak null, undefined, atau string kosong)
    if (Title) {
        // Jika 'Title' ada, kembalikan elemen div dengan title dan Fieldx
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <Fieldx size='small' fullWidth id="outlined-basic" variant="outlined" />
            </div>
        )
    } else {
        // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
        return (
            <>
                <Fieldx size='small' fullWidth id="outlined-basic" variant="outlined" />
            </>
        )
    }
}

export default FieldSingle