import { useState } from 'react'
import { Fieldx, FieldxKamio } from '@assets/styling/style'
import { Button, DialogActions, Grid, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Clear } from '@mui/icons-material';



import { Selectx, MenuItemx } from '@assets/styling/style';
import stylex from '@assets/styling/stylex'

import axios from "axios";



function AccessSettingAdd({ handleCloseModalAdd }) {

    const [type, setType] = useState(0);
    const [form, setForm] = useState({

    })


    const handleChange = (event) => {
        setType(event.target.value);
    };

    const getHandle = () => {
        axios.post(URL, {

        }).then((response) => {

        }).catch((error) => {

        })
    }


    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='headerModalLeft'>Add Data</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={handleCloseModalAdd} aria-label="fingerprint">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">
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

                </DialogContentText>
            </DialogContent >
            <DialogActions>
                <Button autoFocus onClick={handleCloseModalAdd}>
                    Cancel
                </Button>
                <Button onClick={handleCloseModalAdd} autoFocus>
                    Save
                </Button>
            </DialogActions>


        </>
    )
}

export default AccessSettingAdd
