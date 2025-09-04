import React from 'react'

function FieldDatex({ Title }) {
    if (Title) {
        // Jika 'Title' ada, kembalikan elemen div dengan title dan Fieldx
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <input className='inputDate fullWidth' type="date" />
            </div>
        )
    } else {
        // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
        return (
            <>
                <input className='inputDate fullWidth' type="date" />
            </>
        )
    }

}

export default FieldDatex
