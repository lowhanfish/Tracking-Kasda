import * as React from 'react';






import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";

import { Clear, Add } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';
import Anchorx from '@components/items/Anchorx';

import { Fieldx, Selectx, MenuItemx } from '@assets/styling/style'
import { useState } from 'react';


import Addx from './components/add.jsx'



const Registration = () => {


    const [menu, setMenu] = useState([])
    const [typeEvent, setTypeEvent] = useState("ADD")

    const [form, setForm] = useState({
        id: '',
        title: '',
        access_unit: 0,
    })




    // ====== ANCHOR ====== 
    const [anchorEls, setAnchorEls] = React.useState({}); // key = index

    const handleClick = (event, index) => {
        setAnchorEls(prev => ({ ...prev, [index]: event.currentTarget }));
    };

    const handleClose = (index) => {
        setAnchorEls(prev => ({ ...prev, [index]: null }));
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
                    <button onClick={handleClickopenModalAdd} className='btn md primarySoft shaddow1 width150'>
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
                                <th style={{ width: '90%' }} scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody className="h_body">
                            {
                                [...Array(10)].map((_, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Anchorx index={index} />
                                        </td>
                                        <td className='center'>{index + 1}</td>
                                        <td>Galang Aditya</td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </table>
                </div>

                <div className='paginContainer'>
                    <Pagination count={10} color="primary" variant="outlined" />
                </div>



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

export default Registration