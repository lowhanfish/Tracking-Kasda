import React from 'react';
// Import Select dan MenuItem dari MUI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// Asumsi Selectx dan MenuItemx adalah varian styling Anda
import { Selectx, MenuItemx } from '@assets/styling/style';


// Data default untuk BasicSelect
const DEFAULT_OPTIONS = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' }
];

// Definisikan nilai default untuk props opsional
function BasicSelect({
    Title,
    name = '',
    value = '', // Default value harus diset agar controlled component berfungsi
    onChange = () => { },
    options = DEFAULT_OPTIONS // Menerima array opsi: [{ value: '...', label: '...' }], default ke DEFAULT_OPTIONS
}) {

    // Kumpulan props yang akan diteruskan ke komponen Selectx
    const selectProps = {
        size: 'small',
        fullWidth: true,
        id: name ? `${name}-select` : "basic-select-id",
        variant: "outlined",
        name: name,
        value: value,
        onChange: onChange,
        labelId: name ? `${name}-label` : "basic-select-label"
    };

    // Mapping array options menjadi komponen MenuItemx
    const menuItems = options.map((option, index) => (
        <MenuItemx key={index} value={option.value}>
            {option.label || option.title || option.uraian}
        </MenuItemx>
    ));


    // Logika menampilkan Title atau tidak
    if (Title) {
        return (
            <div className='inputContainer'>
                {/* Gunakan elemen label jika memungkinkan untuk aksesibilitas */}
                <div className='inputText'>{Title}</div>
                <Selectx {...selectProps}>
                    {menuItems}
                </Selectx>
            </div>
        );
    }

    // Jika 'Title' tidak ada, kembalikan hanya elemen Selectx
    return (
        <Selectx {...selectProps}>
            {menuItems}
        </Selectx>
    );
}

export default BasicSelect;