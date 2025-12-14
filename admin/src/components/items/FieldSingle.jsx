import React from 'react'
import { Fieldx } from '@assets/styling/style'
// import FieldxKamio and stylex tidak diperlukan jika tidak digunakan di sini

// Definisikan nilai default untuk props opsional (name, value, onChange)
function FieldSingle({ Title = "", name = '', value = undefined, onChange = (e) => { }, disabledx = false, type = "text", ...rest }) {

    // Untuk file input, gunakan native HTML input element
    if (type === 'file') {
        return (
            <div className='inputContainer'>
                {Title && <div className='inputText'>{Title}</div>}
                <input
                    type='file'
                    name={name}
                    onChange={onChange}
                    disabled={disabledx}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #E0E3E7',
                        backgroundColor: '#F3F6F9',
                        cursor: disabledx ? 'not-allowed' : 'pointer'
                    }}
                    {...rest}
                />
            </div>
        );
    }

    // Objek props untuk Fieldx. 
    // Jika name, value, atau onChange tidak diset, ia akan menggunakan nilai default-nya.
    const inputProps = {
        size: 'small',
        fullWidth: true,
        // id unik diperlukan untuk aksesibilitas, gunakan name jika ada
        id: name ? `${name}-input` : "outlined-basic",
        variant: "outlined",
        type: type,

        // Meneruskan props opsional (value dan onChange diperlukan untuk controlled input)
        name: name,
        value: value,
        onChange: onChange,
        ...rest  // Spread additional props like accept, multiple, etc.
    };

    // Pengecekan: Jika 'Title' didefinisikan (bukan null, undefined, atau string kosong)
    if (Title) {
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                {/* Meneruskan semua props yang diperlukan ke Fieldx */}
                <Fieldx disabled={disabledx} {...inputProps} />
            </div>
        );
    }

    // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
    return (
        <Fieldx {...inputProps} />
    );
}

export default FieldSingle;