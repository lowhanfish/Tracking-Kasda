import { useEffect, useState } from 'react'
import { Fieldx } from '@assets/styling/style'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Clear } from '@mui/icons-material';



import { Selectx, MenuItemx } from '@assets/styling/style';

import axios from "axios";
import useStorex from '@store/index.js';




function AccessSettingAdd({ handleCloseModalAdd, typeEvent, formx, getData }) {


    const token = localStorage.getItem('authToken');
    const { url } = useStorex();

    const [pathx, setPathx] = useState("/add")
    const [form, setForm] = useState({
        id: '',
        title: '',
        access_unit: 0,
    })


    const handleForm = (field) => (e) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: e.target.value
        }));
    };
    const handleForm1 = (field, valuex) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: valuex
        }));
    };



    const getHandle = () => {
        axios.post(url.URL_GROUP + pathx, JSON.stringify(form), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            alert(JSON.stringify(error.response.data))
            console.log(error)
        })
    }

    const [listMenu, setListMenu] = useState([]);

    axios.post(url.URL_MENU, JSON.stringify(form), {
        headers: {
            'Authorization': `kikensbatara ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })


    useEffect(() => {
        setForm({
            id: '',
            title: '',
            access_unit: 0,
        })

        if (typeEvent === 'ADD') {
            setPathx("/add")
        } else if (typeEvent === 'EDIT') {
            setPathx("/update")
            setForm({
                id: formx.id,
                title: formx.title,
                access_unit: formx.access_unit,
            })
        }
    }, [])


    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='headerModalLeft'>Add User</div>
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
                        <div className='inputText'>Group Name</div>
                        <Fieldx value={form.title} onChange={handleForm('title')} size='small' fullWidth id="outlined-basic" variant="outlined" />
                    </div>
                    <div className='inputContainer'>
                        <div className='inputText'>Akses unit</div>
                        <Selectx
                            labelId="demo-simple-select-label"
                            size='small'
                            fullWidth id="outlined-basic" variant="outlined"
                            value={form.access_unit}
                            onChange={handleForm('access_unit')}
                        >
                            <MenuItemx value={0}>Sub Unit Kerja</MenuItemx>
                            <MenuItemx value={1}>Unit Kerja</MenuItemx>
                            <MenuItemx value={2}>Instansi</MenuItemx>
                        </Selectx>
                    </div>

                </DialogContentText>
            </DialogContent>
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
