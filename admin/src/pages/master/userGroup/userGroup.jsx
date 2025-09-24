import * as React from 'react';
import { useState } from 'react';




import { Button, Dialog, Grid, Menu, MenuItem, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";
import axios from 'axios'

import useStorex from '@store/index.js';
import { Settings, Add, Store } from '@mui/icons-material';


import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';
import Anchorx from '@components/items/Anchorx';

import { accessUnit } from "@lib/index.js";
import { Fieldx, Selectx, MenuItemx } from '@assets/styling/style'



import Addx from './components/add.jsx'
import { useEffect } from 'react';



const userGroup = () => {

    const { url } = useStorex();
    const token = localStorage.getItem('authToken');

    const [menu, setMenu] = useState([])
    const [typeEvent, setTypeEvent] = useState("ADD")
    const [listData, setListData] = useState([])

    const [form, setForm] = useState({
        id: '',
        title: '',
        access_unit: 0,
    })


    const getData = () => {

        // console.log(url.URL_GROUP);
        // console.log(token)
        axios.post(url.URL_GROUP + "/view", JSON.stringify(form), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then(response => {
            // console.log(response);
            setListData(response.data);
        }).catch(error => {
            console.log(error);
        })
    }







    // ====== ANCHOR ====== 
    const [anchorEl, setAnchorEl] = useState(null);
    const [openIndex, setOpenAnchorIndex] = useState(null);

    const handleClickAnchor = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpenAnchorIndex(index);
    };

    const handleCloseAnchor = () => {
        setAnchorEl(null);
        setOpenAnchorIndex(null);
    };
    // ====== ANCHOR ====== 





    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModal] = React.useState(false);
    // const theme = useTheme();
    const [fullScreen, setFullScreen] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModal(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModal(false);
    };
    // ====== MODAL ADD ====== 


    useEffect(() => {
        getData();
    }, [])


    return (
        <div className="cardx">
            <div className="cardxHeader">
                <Grid container spacing={1}>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldWithButton placeholderx={'Cari Data..'} />
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldSingle />
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldAutocomplete />
                    </Grid>
                </Grid>
            </div>
            <div className="cardxBody">


                {/* <Button className='btnAdd' variant="contained" size="small">Small</Button> */}
                <div className='btnContainer'>
                    <button onClick={(e) => { e.currentTarget.blur(); setTypeEvent('ADD'); handleClickopenModalAdd(); }} className='btn md primarySoft shaddow1 width150'>
                        <Add sx={{ fontSize: 18 }} />
                        Add Data
                    </button>
                </div>

                <div className="table-wrap" tabIndex="0">
                    <table className="tabelku shaddow2" style={{ width: '100%' }}>
                        <thead className="h_thead shaddowText">
                            <tr>
                                <th style={{ width: '5%' }} scope="col" className='center'>set</th>
                                <th style={{ width: '5%' }} scope="col" className='center'>No</th>
                                <th style={{ width: '60%' }} scope="col">Group</th>
                                <th style={{ width: '30%' }} scope="col">Access Unit</th>
                            </tr>
                        </thead>
                        <tbody className="h_body">
                            {
                                listData.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>
                                            {/* <Anchorx index={index} /> */}


                                            <div className='settingContainer'>
                                                <button
                                                    className="btn rad primarySoft sm"
                                                    onClick={(e) => handleClickAnchor(e, index)}
                                                >
                                                    <Settings sx={{ fontSize: 14 }} />
                                                </button>

                                                <Menu
                                                    keepMounted
                                                    id={`menu-${index}`}
                                                    anchorEl={openIndex === index ? anchorEl : null}
                                                    open={openIndex === index}
                                                    onClose={handleCloseAnchor}
                                                    slotProps={{
                                                        list: {
                                                            'aria-labelledby': `basic-button-${index}`,
                                                        },
                                                    }}
                                                >
                                                    <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Detail</MenuItem>
                                                    <MenuItem onClick={(e) => { e.currentTarget.blur(); setTypeEvent('EDIT'); handleClickopenModalAdd(); }} sx={{ fontSize: 12 }}>Edit</MenuItem>
                                                    <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Delete</MenuItem>
                                                </Menu>
                                            </div>




                                        </td>
                                        <td className='center'>{index + 1}</td>
                                        <td>{data.title}</td>
                                        <td>{accessUnit(data.access_unit)}</td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </table>
                </div>

                {/* <div className='paginContainer'>
                    <Pagination count={10} color="primary" variant="outlined" />
                </div> */}



                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidth}
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Addx handleCloseModalAdd={handleCloseModalAdd} typeEvent={typeEvent} formx={form} />
                </Dialog>




            </div>
        </div>
    )
}

export default userGroup