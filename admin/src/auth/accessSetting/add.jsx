import { useEffect, useState } from 'react'
import { Fieldx, FieldxKamio } from '@assets/styling/style'
import { Button, DialogActions, Grid, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Clear } from '@mui/icons-material';



import { Selectx, MenuItemx } from '@assets/styling/style';
import stylex from '@assets/styling/stylex'

import axios from "axios";
import useStorex from '../../store';



function AccessSettingAdd({ handleCloseModalAdd, typeEvent, formx }) {

    // console.log(typeEvent)

    const token = localStorage.getItem('authToken');
    const { url } = useStorex();
    // console.log(token)
    // console.log(url.URL_MENU)

    const [pathx, setPathx] = useState("/add")
    const [form, setForm] = useState({
        id: '',
        number: '',
        title: '',
        icon: '',
        path: '',
        parent: null,
        multiple: 0,
    })


    const handleForm = (field) => (e) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: e.target.value
        }));
    };



    const getHandle = () => {

        // console.log(form)
        axios.post(url.URL_MENU + pathx, JSON.stringify(form), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            alert(JSON.stringify(error.response.data))
            console.log(error)
        })
    }

    useEffect(() => {
        setForm({
            id: '',
            number: '',
            title: '',
            icon: '',
            path: '',
            parent: null,
            multiple: 0,
        })
        if (typeEvent === 'ADD') {
            setPathx("/add")
        } else if (typeEvent === 'EDIT') {
            setPathx("/update")
            setForm({
                id: formx.id,
                number: formx.number,
                title: formx.title,
                icon: formx.icon,
                path: formx.path,
                parent: formx.parent,
                multiple: formx.multiple,
            })
        }
    }, [])


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
                        <Fieldx value={form.title} onChange={handleForm('title')} size='small' fullWidth id="outlined-basic" variant="outlined" />
                    </div>

                    <div className='inputContainer'>
                        <Grid container spacing={1}>
                            <Grid size={{ md: 6, xs: 12 }}>
                                <div className='inputText'>List Number</div>
                                <Fieldx type={'number'} value={form.number} onChange={handleForm('number')} size='small' fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                            <Grid size={{ md: 6, xs: 12 }}>
                                <div className='inputText'>Icon Name</div>
                                <Fieldx value={form.icon} onChange={handleForm('icon')} ize='small' fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                        </Grid>
                    </div>
                    <div className='inputContainer'>
                        <Grid container spacing={1}>
                            <Grid size={{ md: 6, xs: 12 }}>
                                <div className='inputText'>Route</div>
                                <Fieldx value={form.path} onChange={handleForm('path')} size='small' fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                            <Grid size={{ md: 6, xs: 12 }}>
                                <div className='inputText'>Type</div>
                                <Selectx
                                    labelId="demo-simple-select-label"
                                    size='small'
                                    fullWidth id="outlined-basic" variant="outlined"
                                    value={form.multiple}
                                    onChange={handleForm('multiple')}
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
                <Button onClick={getHandle} autoFocus>
                    Save
                </Button>
            </DialogActions>


        </>
    )
}

export default AccessSettingAdd
