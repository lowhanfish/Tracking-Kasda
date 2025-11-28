import React, { useState, useEffect } from 'react';

import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton, Breakpoint } from "@mui/material";

import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
import FieldSingle from '@components/items/FieldSingle.jsx';
import FieldWithButton from '@components/items/FieldWithButton.jsx';
import FieldAutocomplete from '@components/items/FieldAutocomplete.jsx';
import Anchorx from '@components/items/Anchorx.jsx';
import FieldDatex from '@components/items/FieldDatex.jsx';
import BasicSelect from '@components/items/BasicSelect.jsx';
import Checkboxz from '@components/items/Checkboxz.jsx';
import CheckboxzLable from '@components/items/CheckboxLable.jsx';
import ListDataItems from '@components/ListDataItems';





const Template1 = () => {




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
    const [openModalAdd, setOpenModal] = useState(false);
    // const theme = useTheme();
    const [fullScreen, setFullScreen] = useState(true);
    const [maxWidth, setMaxWidth] = useState<Breakpoint | false>('sm');

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
                    {/* <button className='btn danger shaddow1'>Add Data</button> <br /> <br />
                    <button className='btn lg warning fullWidth shaddow2'>Add Data</button> */}
                </div>

                {/* LIST ITEM - show 2 columns per row on md+ */}
                <Grid container spacing={1}>
                    {
                        [...Array(10)].map((data, index) => (
                            <Grid size={{ md: 6, xs: 12 }} key={index}>

                                <ListDataItems
                                    title='(LS)-Pembangunan Data Center Kab. Konawe Selatan'
                                    unit='Dinas Komunikasi Informatika dan Persandian'
                                    price={120000}
                                />

                            </Grid>
                        ))
                    }

                </Grid>





                <div className='paginContainer'>
                    <Pagination count={10} color="primary" variant="outlined" />
                </div>

                {/* ================= ADD DATA ================= */}
                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidth}

                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="responsive-dialog-title"
                >
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

                            <FieldSingle Title={'FieldSingle'} />
                            <FieldWithButton Title={'FieldWithButton'} />

                            <Grid container spacing={1}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <FieldAutocomplete Title={'FieldAutocomplete'} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <FieldDatex Title={'FieldDatex'} />
                                </Grid>
                            </Grid>

                            <BasicSelect Title={'BasicSelect'} />

                            <Grid container spacing={1}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <Checkboxz Title={'Checkboxz Without Lable'} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CheckboxzLable Title={'CheckboxzLable With Lable'} />
                                </Grid>
                            </Grid>




                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseModalAdd}>
                            Cancel
                        </Button>
                        <Button onClick={handleCloseModalAdd} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* ================= ADD DATA ================= */}



            </div>
        </div>
    )
}

export default Template1