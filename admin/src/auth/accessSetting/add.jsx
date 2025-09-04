import React from 'react'
import { Fieldx, FieldxKamio } from '@assets/styling/style'
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { Selectx, MenuItemx } from '@assets/styling/style';
import stylex from '@assets/styling/stylex'

function AccessSettingAdd() {

    const [type, setType] = React.useState(0);

    const handleChange = (event) => {
        setType(event.target.value);
    };


    return (
        <div>
            <div className='inputContainer'>
                <div className='inputText'>Route Name</div>
                <Fieldx size='small' fullWidth id="outlined-basic" variant="outlined" />
            </div>

            <div className='inputContainer'>
                <Grid container spacing={1}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='inputText'>List Number</div>
                        <Fieldx size='small' fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='inputText'>Icon Name</div>
                        <Fieldx size='small' fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                </Grid>
            </div>
            <div className='inputContainer'>
                <Grid container spacing={1}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='inputText'>Route</div>
                        <Fieldx size='small' fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='inputText'>Type</div>
                        <Selectx
                            labelId="demo-simple-select-label"
                            size='small'
                            fullWidth id="outlined-basic" variant="outlined"
                            value={type}
                            onChange={handleChange}
                        >
                            <MenuItemx value={1}>Multiple</MenuItemx>
                            <MenuItemx value={0}>Single</MenuItemx>
                        </Selectx>
                    </Grid>
                </Grid>
            </div>


        </div>
    )
}

export default AccessSettingAdd
