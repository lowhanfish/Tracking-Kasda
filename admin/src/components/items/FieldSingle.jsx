import React from 'react'
import { Fieldx } from '@assets/styling/style'
// import FieldxKamio and stylex tidak diperlukan jika tidak digunakan di sini

// Definisikan nilai default untuk props opsional (name, value, onChange)
function FieldSingle({ Title, name = '', value = undefined, onChange = () => { } }) {

    // Objek props untuk Fieldx. 
    // Jika name, value, atau onChange tidak diset, ia akan menggunakan nilai default-nya.
    const inputProps = {
        size: 'small',
        fullWidth: true,
        // id unik diperlukan untuk aksesibilitas, gunakan name jika ada
        id: name ? `${name}-input` : "outlined-basic",
        variant: "outlined",

        // Meneruskan props opsional (value dan onChange diperlukan untuk controlled input)
        name: name,
        value: value,
        onChange: onChange,
    };

    // Pengecekan: Jika 'Title' didefinisikan (bukan null, undefined, atau string kosong)
    if (Title) {
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                {/* Meneruskan semua props yang diperlukan ke Fieldx */}
                <Fieldx {...inputProps} />
            </div>
        );
    }

    // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
    return (
        <Fieldx {...inputProps} />
    );
}

export default FieldSingle;