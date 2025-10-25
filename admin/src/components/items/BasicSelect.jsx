import React from 'react';
// Import Select dan MenuItem dari MUI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// Asumsi Selectx dan MenuItemx adalah varian styling Anda
import { Selectx, MenuItemx } from '@assets/styling/style';


// Definisikan nilai default untuk props opsional
function BasicSelect({
    Title,
    name = '',
    value = '', // Default value harus diset agar controlled component berfungsi
    onChange = () => { },
    options = [] // Menerima array opsi: [{ value: '...', label: '...' }]
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