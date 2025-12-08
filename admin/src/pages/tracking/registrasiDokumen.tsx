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
import Stepperx from '@components/Stepperx';





// Small reusable Dialog wrapper for consistency
function DetailDialog({ open, onClose, fullScreen, maxWidth, title, children }: any) {
    // fullScreen => Dialog.fullScreen (boolean)
    // fullWidth is always helpful for our layout, so pass it as true
    return (
        <Dialog fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    {/* <div className='headerModalLeft'>{title}</div> */}
                    <div className='TextProfileHead shaddowText'>{title}</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={onClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

function AddDialog({ open, onClose, fullScreen, maxWidth, title, children }: any) {
    // fullScreen => Dialog.fullScreen (boolean)
    return (
        <Dialog fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='TextProfileHead shaddowText'>{title} Data</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={onClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

function SettingDialog({ open, onClose, fullScreen, maxWidth, children }: any) {
    // fullScreen => Dialog.fullScreen (boolean)
    return (
        <Dialog fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='headerModalRight'>
                        <IconButton onClick={onClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">{children}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

const RegistrasiDokumen = () => {

    // ====== ANCHOR ======
    const [anchorEls, setAnchorEls] = React.useState<Record<number, HTMLElement | null>>({});
    const handleAnchorOpen = (event: any, index: number) => setAnchorEls(prev => ({ ...prev, [index]: event.currentTarget }));
    const handleAnchorClose = (index: number) => setAnchorEls(prev => ({ ...prev, [index]: null }));

    // ====== ANCHOR ======

    // ====== MODAL SETTING ======
    const [openModalSetting, setOpenModalSetting] = useState(false);
    const openSetting = () => setOpenModalSetting(true);
    const closeSetting = () => setOpenModalSetting(false);

    // ====== MODAL DETAIL ======
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const openDetail = () => setOpenModalDetail(true);
    const closeDetail = () => setOpenModalDetail(false);

    // ====== MODAL ADD ======
    const [addMode, setAddMode] = useState("ADD");
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    // const [maxWidth, setMaxWidth] = useState<Breakpoint | false>('md');
    const openAdd = () => setOpenModalAdd(true);
    const closeAdd = () => setOpenModalAdd(false);
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
                    <button onClick={() => { openAdd(); setAddMode("ADD"); }} className='btn md primarySoft shaddow1 width150'>
                        <Add sx={{ fontSize: 18 }} />
                        Add Data
                    </button>
                    {/* <button className='btn danger shaddow1'>Add Data</button> <br /> <br />
                    <button className='btn lg warning fullWidth shaddow2'>Add Data</button> */}
                </div>

                {/* LIST ITEM - show 2 columns per row on md+ */}
                <Grid container spacing={1}>
                    {/* {
                        [...Array(1)].map((data, index) => (
                            <Grid size={{ md: 6, xs: 12 }} key={index}>
                                <div onClick={() => { openSetting(); }}>
                                    <ListDataItems
                                        title='(LS - Non Modal)- Pembayaran Honorarium Non ASN (Juli-September)'
                                        price={120000000}
                                    />
                                </div>

                            </Grid>
                        ))
                    } */}

                    <Grid size={{ md: 6, xs: 12 }}>
                        <div onClick={() => { openSetting(); }}>

                            <ListDataItems
                                unit='Dinas Komunikasi Informatika dan Persandian'
                                title='(LS - Non Modal)- Pembayaran Honorarium Non ASN (Juli-September)'
                                price={120000000}
                            />
                        </div>

                    </Grid>

                    <Grid size={{ md: 6, xs: 12 }}>
                        <div onClick={() => { openSetting(); }}>

                            <ListDataItems
                                unit='Dinas Komunikasi Informatika dan Persandian'
                                title='(LS - Non Modal)- Pembayaran Perjalanan Dinas Luar Daerah'
                                price={11000000}
                            />
                        </div>

                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div onClick={() => { openSetting(); }}>

                            <ListDataItems
                                unit='Dinas Komunikasi Informatika dan Persandian'
                                title='(LS - Non Modal)- Pembayaran Jasa Langganan Listrik'
                                price={5000000}
                            />
                        </div>

                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div onClick={() => { openSetting(); }}>

                            <ListDataItems
                                unit='Dinas Komunikasi Informatika dan Persandian'
                                title='(LS - Non Modal)- Pembayaran Jasa Langganan Internet - July'
                                price={750000}
                            />
                        </div>

                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div onClick={() => { openSetting(); }}>

                            <ListDataItems
                                unit='Dinas Komunikasi Informatika dan Persandian'
                                title='(LS - Non Modal)- Belanja ATK'
                                price={350000}
                            />
                        </div>

                    </Grid>



                </Grid>





                <div className='paginContainer'>
                    <Pagination count={10} color="primary" variant="outlined" />
                </div>

                {/* ================= SETTINGDETAIL DATA ================= */}
                <SettingDialog
                    open={openModalSetting}
                    onClose={closeSetting}
                    fullScreen={fullScreen}
                    maxWidth={"xs"}
                    title="Detail Data"
                >
                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <Button onClick={() => { openDetail(); }} fullWidth variant="outlined" size="small">
                                Detail
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Button onClick={() => { closeSetting(); openAdd(); setAddMode("EDIT"); }} color="warning" fullWidth variant="outlined" size="small">
                                Edit
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Button color="error" fullWidth variant="outlined" size="small">
                                Remove
                            </Button>
                        </Grid>



                    </Grid>





                </SettingDialog>
                {/* ================= SETTING DATA ================= */}

                {/* ================= DETAIL DATA ================= */}
                <DetailDialog
                    open={openModalDetail}
                    onClose={closeDetail}
                    fullScreen={fullScreen}
                    maxWidth="sm"
                    title="Detail Data"
                >


                    <div>

                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Unit Kerja</div>
                            <div className='TextProfileLeftVal'>Dinas xxxx</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Nama Kegiatan</div>
                            <div className='TextProfileLeftVal'>Pengadaan xxxx</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Tanggal Pengajuan</div>
                            <div className='TextProfileLeftVal'>Tanggal xxxx</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Pagu Anggaran</div>
                            <div className='TextProfileLeftVal'>xxxxx</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Pajak</div>
                            <div className='TextProfileLeftVal'>
                                PPN : 10% - PPH(21) : 1.2%
                            </div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Total Pencairan</div>
                            <div className='TextProfileLeftVal'>
                                Rp.xxx
                            </div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Di Ajukan Oleh</div>
                            <div className='TextProfileLeftVal'>xxxxx</div>
                        </div>


                        <div style={{ marginTop: 20 }} className='dashboardContainer'>
                            <div className='dashboardTitle'>Progres Kegiatan Terahir</div>
                            <Stepperx />
                        </div>


                    </div>



                </DetailDialog>
                {/* ================= DETAIL DATA ================= */}


                {/* ================= ADD DATA ================= */}
                <AddDialog
                    open={openModalAdd}
                    onClose={closeAdd}
                    title={addMode}
                    fullScreen={fullScreen}
                    maxWidth="sm"
                >
                    <FieldSingle Title={'Nama Kegiatan'} />

                    <Grid container spacing={1}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <BasicSelect Title={'Jenis Pencairan'} />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <FieldSingle Title={'Besaran Anggaran'} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <BasicSelect Title={'Jenis PPN'} />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <BasicSelect Title={'Jenis PPH'} />
                        </Grid>
                    </Grid>
                </AddDialog>
                {/* ================= ADD DATA ================= */}

            </div>
        </div>
    )
}

export default RegistrasiDokumen