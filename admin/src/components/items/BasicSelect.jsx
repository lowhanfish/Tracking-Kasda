import React from 'react'


import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Selectx, MenuItemx } from '@assets/styling/style';


function BasicSelect({ Title }) {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    if (Title) {
        // Jika 'Title' ada, kembalikan elemen div dengan title dan Fieldx
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <Selectx
                    labelId="demo-simple-select-label"
                    size='small'
                    fullWidth id="outlined-basic" variant="outlined"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItemx value={10}>Ten</MenuItemx>
                    <MenuItemx value={20}>Twenty</MenuItemx>
                    <MenuItemx value={30}>Thirty</MenuItemx>
                </Selectx>
            </div>
        )
    } else {
        // Jika 'Title' tidak ada, kembalikan hanya elemen Fieldx
        return (
            <>
                <Selectx
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItemx value={10}>Ten</MenuItemx>
                    <MenuItemx value={20}>Twenty</MenuItemx>
                    <MenuItemx value={30}>Thirty</MenuItemx>
                </Selectx>
            </>
        )
    }
}

export default BasicSelect
