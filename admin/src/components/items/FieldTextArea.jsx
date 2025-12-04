import React from 'react'
import { FieldxTextArea } from '@assets/styling/style'

function FieldTextArea({ Title = "", name = '', value = undefined, onChange = (e) => { }, disabledx = false, rows = 4, placeholder = '' }) {

    // Objek props untuk FieldxTextArea dengan multiline
    const inputProps = {
        size: 'small',
        fullWidth: true,
        id: name ? `${name}-textarea` : "textarea-basic",
        variant: "outlined",
        multiline: true,
        rows: rows,
        placeholder: placeholder,
        name: name,
        value: value,
        onChange: onChange,
    };

    // Jika 'Title' didefinisikan
    if (Title) {
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <FieldxTextArea disabled={disabledx} {...inputProps} />
            </div>
        );
    }

    // Jika 'Title' tidak ada, kembalikan hanya elemen FieldxTextArea
    return (
        <FieldxTextArea {...inputProps} />
    );
}

export default FieldTextArea;
