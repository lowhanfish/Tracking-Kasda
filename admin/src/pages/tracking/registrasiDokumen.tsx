import React, { useState, useEffect } from 'react';

import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton, Breakpoint } from "@mui/material";

import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
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

import { getPOST } from "@lib/dataFetch.js";
import useStorex from '@store/index';



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


    const { url } = useStorex();
    const token = localStorage.getItem('authToken');


    const [listPPN, setListPPN] = useState([]);
    const [listPPH, setListPPH] = useState([]);

    const [formData, setFormData] = useState({
        id: '',
        uraian: '',
        master_jns_pencairan_id: '',
        nilai: 0,
    });

    const [file, setFile] = useState(null);
    const [ppn, setPpn] = useState([]);
    const [pph, setPph] = useState([]);


    const pushPPH = (event) => {
        // event.target.value adalah value dari MenuItem
        const selectedValue = event.target.value;
        const selectedItem = listPPH.find(item => item.value === selectedValue);

        console.log(selectedItem)

        if (selectedItem) {
            const newItem = {
                ...selectedItem,
                id: Date.now() // Unique ID untuk setiap item
            };
            setPph(prev => [...prev, newItem]);
        }
    }

    const pushPPN = (event) => {
        // event.target.value adalah value dari MenuItem
        const selectedValue = event.target.value;
        const selectedItem = listPPN.find(item => item.value === selectedValue);

        if (selectedItem) {
            const newItem = {
                ...selectedItem,
                // id: Date.now() // Unique ID untuk setiap item
            };
            setPpn(prev => [...prev, newItem]);
        }
    }


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


    const loadDataRef = async () => {
        const listPPHX = await getPOST(token, url.URL_MASTER_PPH + '/', {});
        setListPPH(listPPHX);
        console.log(listPPH)
    }


    useEffect(() => {
        loadDataRef();
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
                    <button onClick={() => { openAdd(); setAddMode("ADD"); }} className='btn md primarySoft shaddow1 width150'>
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
                                <div onClick={() => { openSetting(); }}>
                                    <ListDataItems
                                        unit='Dinas Komunikasi Informatika dan Persandian'
                                        title='(LS - Non Modal)- Pembayaran Honorarium Non ASN (Juli-September)'
                                        price={120000000}
                                    />
                                </div>

                            </Grid>
                        ))
                    }





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

                    <hr className='hrku2' />

                    <Grid container spacing={1}>
                        <div className='inputText'>
                            Tambah PPN
                        </div>

                        <Grid size={{ md: 12, xs: 12 }}>
                            <BasicSelect
                                options={listPPN}
                                onChange={pushPPN}
                            />
                        </Grid>

                    </Grid>
                    <Grid container spacing={1}>
                        <Grid size={{ md: 12, xs: 12 }}>
                            <div className="table-wrap" style={{ marginTop: 10 }}>
                                <table className="tabelku shaddow2" style={{ width: '100%' }}>
                                    <thead className="h_thead shaddowText">
                                        <tr>
                                            <th style={{ width: '5%' }} scope="col">No</th>
                                            <th style={{ width: '55%' }} scope="col">Pajak</th>
                                            <th style={{ width: '35%' }} scope="col">Nilai</th>
                                            <th style={{ width: '5%' }} scope="col">set</th>
                                        </tr>
                                    </thead>
                                    <tbody className="h_body">
                                        {
                                            ppn.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className='center'>
                                                        Tidak ada PPN
                                                    </td>
                                                </tr>
                                            ) : (
                                                ppn.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className='center'>{index + 1}.</td>
                                                        <td>{item.label}</td>
                                                        <td>{item.nilai}</td>
                                                        <td>
                                                            <button
                                                                className='btn sm danger shaddow1'
                                                                onClick={() => setPpn(prev => prev.filter(p => p.id !== item.id))}
                                                            >
                                                                <CloseIcon sx={{ fontSize: 18 }} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Grid>
                    </Grid>
                    <hr className='hrku2' />
                    <hr className='hrku2' />

                    <Grid container spacing={1}>
                        <div className='inputText'>
                            Tambah PPh
                        </div>

                        <Grid size={{ md: 12, xs: 12 }}>
                            <BasicSelect
                                options={listPPH}
                                onChange={pushPPH}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid size={{ md: 12, xs: 12 }}>
                            <div className="table-wrap" style={{ marginTop: 10 }}>
                                <table className="tabelku shaddow2" style={{ width: '100%' }}>
                                    <thead className="h_thead shaddowText">
                                        <tr>
                                            <th style={{ width: '5%' }} scope="col">No</th>
                                            <th style={{ width: '55%' }} scope="col">Pajak</th>
                                            <th style={{ width: '35%' }} scope="col">Nilai</th>
                                            <th style={{ width: '5%' }} scope="col">set</th>
                                        </tr>
                                    </thead>
                                    <tbody className="h_body">
                                        {
                                            pph.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className='center'>
                                                        Tidak ada PPH
                                                    </td>
                                                </tr>
                                            ) : (
                                                pph.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className='center'>{index + 1}.</td>
                                                        <td>{item.label}</td>
                                                        <td>{item.nilai}%</td>
                                                        <td>
                                                            <button
                                                                className='btn sm danger shaddow1'
                                                                onClick={() => setPph(prev => prev.filter(p => p.id !== item.id))}
                                                            >
                                                                <CloseIcon sx={{ fontSize: 18 }} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Grid>
                    </Grid>
                    <hr className='hrku2' />
                </AddDialog>
                {/* ================= ADD DATA ================= */}

            </div>
        </div>
    )
}

export default RegistrasiDokumen