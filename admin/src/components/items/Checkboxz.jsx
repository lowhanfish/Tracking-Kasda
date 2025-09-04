import React from 'react'
import Checkbox from '@mui/material/Checkbox';

function Checkboxz({ Title }) {
    const [checked1, setChecked1] = React.useState(true);
    const handleChange1 = (event) => {
        setChecked1(event.target.checked);
    };
    const [checked2, setChecked2] = React.useState(true);
    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
    };
    const [checked3, setChecked3] = React.useState(true);
    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
    };


    if (Title) {
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <Checkbox label="Label1" checked={checked1} onChange={handleChange1} />
                <Checkbox label="Label2" checked={checked2} onChange={handleChange2} />
                <Checkbox label="Label3" checked={checked3} onChange={handleChange3} />
            </div>
        )

    } else {
        return (
            <>
                <Checkbox checked={checked1} onChange={handleChange1} />
            </>
        )
    }

}

export default Checkboxz
