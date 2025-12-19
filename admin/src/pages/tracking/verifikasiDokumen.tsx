import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton, Breakpoint, Menu, MenuItem, InputAdornment, TextField } from "@mui/material";

import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';

import ListDataItems from '@components/ListDataItems';


import { getPOST } from "@lib/dataFetch.js";
import useStorex from '@store/index';
import SnackBarx from '@components/items/SnackBar';
import DetailData from '@components/DetailData';

import { Fieldx, Autocompletex, Popperx } from '@assets/styling/style'

import { GetUnitKerja } from "@lib/dataFetch.js";


import Swal from 'sweetalert2';


function SettingDialog({ open, onClose, fullScreen, maxWidth, children }: any) {
    // fullScreen => Dialog.fullScreen (boolean)
    return (
        <Dialog disableAutoFocus disableEnforceFocus fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
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

const VerifikasiDokumen = () => {

    const { url } = useStorex();
    const token = localStorage.getItem('authToken');
    const profile = JSON.parse(localStorage.getItem('profile'));

    const { tahapan } = useStorex();
    const tahapanId = tahapan.REGISTRASI_DOK;

    const [listData, setListData] = useState([]);
    const [dataLimit, setDataLimit] = useState(8);
    const [searchData, setSearchData] = useState('');
    const [pageFirst, setPageFirst] = useState(1);
    const [jmlData, setJmlData] = useState(1);
    const [loadData, setLoadData] = useState(false);


    // ====== AUTO COMPLETE ====== 



    const [APIUnitKerja, setAPIUnitKerja] = useState([])
    const [inputValueUnitKerja, setInputValueUnitKerja] = useState('');
    const [selectedUnitKerja, setSelectedUnitKerja] = useState(null);

    const handleDataUnitKerja = async (data) => {
        const newAPIUnitKerja = await GetUnitKerja(data, token, url);
        setAPIUnitKerja(newAPIUnitKerja);
    };


    // ====== AUTO COMPLETE ====== 

    // const formDataToSend.append('pageFirst', pageFirst);
    // formDataToSend.append('jmlData', jmlData);

    const [activeAlert, SetActiveAlert] = useState(false);
    const [messageAlert, SetMessageAlert] = useState("");
    const [colorAlert, SetColorAlert] = useState<'success' | 'error' | 'warning' | 'info'>('success');


    const [listFiles, setListFiles] = useState([]);


    const [formData, setFormData] = useState({
        id: '',
        uraian: '',
        master_jns_pencairan_id: '',
        nilai: 0,
        sub_unit_kerja: profile.profile.sub_unit_kerja_id,
        master_tahapan_id: tahapanId,
    });


    const [ppn, setPpn] = useState([]);
    const [pph, setPph] = useState([]);
    const [tracking, setTracking] = useState([]);
    // const [jnsPencairan, setJnsPencairan] = useState('');
    // const [besaranAnggaran, setBesaranAnggaran] = useState('');
    const [loading, setLoading] = useState(false);



    const viewData = async () => {

        setLoading(true);


        const payload = {
            pageFirst: pageFirst,
            searchData: searchData,
            dataLimit: dataLimit,
            id_unit_kerja: '',
        };

        console.log("========", selectedUnitKerja)

        if (selectedUnitKerja) {
            payload.id_unit_kerja = selectedUnitKerja.id; // pakai id dari object
        }

        const listDatax = await getPOST(token, url.URL_DOCUMENT + '/view', payload);
        setListData(listDatax.data);
        setJmlData(listDatax.jml);
        setLoading(false);
        console.log(listDatax)
        // setListData(res.data);
    }

    const removeData = async () => {

        Swal.fire({
            title: "Apakah anda yakin",
            text: "Anda akan menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus sekarang!",
            customClass: {
                container: 'my-swal'
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                await getPOST(token, url.URL_DOCUMENT + '/delete', formData);
                Swal.fire({
                    title: "Deleted!",
                    text: "Data berhasil dihapus.",
                    icon: "success",
                    customClass: {
                        container: 'my-swal'
                    },
                });
                viewData();
                closeSetting();
            }
        });
    };


    const selectData = (data) => {

        const dataDummy = {
            id: data.id,
            uraian: data.uraian,
            master_jns_pencairan_id: data.master_jns_pencairan_id,
            nilai: data.nilai,
            sub_unit_kerja: data.sub_unit_kerja,
            master_tahapan_id: tahapanId,
            sub_unit_kerja_uraian: data.sub_unit_kerja_uraian,
            uraian_jns_pencairan: data.uraian_jns_pencairan,
            createdAt: data.createdAt,
            nama_pengusul: data.nama_pengusul,

        }

        setFormData({ ...dataDummy });

        // setFormData(dataDummy);



        setPpn(data.ppn);
        setPph(data.pph);
        setListFiles(data.files);
        setTracking(data.tracking);
    }

    const handleFileUpload = (event: any) => {
        const files = event.target.files;
        if (files) {
            setFile(Array.from(files));
        }
    }

    const removeFile = (index: number) => {
        setFile(prev => {
            if (Array.isArray(prev)) {
                return prev.filter((_, i) => i !== index);
            }
            return null;
        });
    }

    const SetAlert = (message, color) => {
        SetColorAlert(color)
        SetMessageAlert(message)
        SetActiveAlert(true);
        setTimeout(() => {
            SetActiveAlert(false);
        }, 2000);
    }


    const cariData = (e) => {
        setPageFirst(1)
        viewData();
    }

    const handlePageChange = (event, value) => {
        setPageFirst(value); // update halaman aktif
        viewData();           // fetch data halaman baru
    };

    // ====== MODAL SETTING ======
    const [openModalSetting, setOpenModalSetting] = useState(false);
    const openSetting = () => setOpenModalSetting(true);
    const closeSetting = () => setOpenModalSetting(false);

    // ====== MODAL DETAIL ======
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const openDetail = () => setOpenModalDetail(true);
    const closeDetail = () => setOpenModalDetail(false);

    // ====== MODAL ADD ======
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    // const [maxWidth, setMaxWidth] = useState<Breakpoint | false>('md');
    const openAdd = () => setOpenModalAdd(true);
    const closeAdd = () => setOpenModalAdd(false);
    // ====== MODAL ADD ======

    const loadDataRef = async () => {
        const listPPHX = await getPOST(token, url.URL_MASTER_PPH + '/', {});
        setListPPH(listPPHX);
        const listPPNX = await getPOST(token, url.URL_MASTER_PPN + '/', {});
        setListPPN(listPPNX);
        const listJnsPencairanx = await getPOST(token, url.URL_MASTER_JNS_PENCAIRAN + '/', {});
        setListJnsPencairan(listJnsPencairanx);
    }

    useEffect(() => {
        viewData();
        loadDataRef();
        handleDataUnitKerja("");
    }, [selectedUnitKerja, searchData, pageFirst])

    return (
        <div className="cardx">

            <div className="cardxHeader">
                <Grid container spacing={1}>
                    <Grid size={{ md: 4, xs: 12 }}>

                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <Autocompletex
                            value={APIUnitKerja.find(opt => opt.id === selectedUnitKerja) || null}
                            onChange={(event, newValue) => {
                                setSelectedUnitKerja(newValue); // simpan full object
                                // getData(); // panggil ulang data
                            }}
                            inputValue={inputValueUnitKerja}
                            onInputChange={(event, newInputValue) => {
                                setInputValueUnitKerja(newInputValue);
                                handleDataUnitKerja(newInputValue); // cari data unit kerja sesuai input
                            }}
                            size="small"
                            options={APIUnitKerja}
                            getOptionLabel={(option: { unit_kerja: string }) => option.unit_kerja || ""}
                            PopperComponent={Popperx}
                            renderInput={(params) => <TextField {...params} />}
                            renderOption={(props, option: { id: string, unit_kerja: string, uraian_instansi: string }) => (
                                <li {...props} key={option.id}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                                            {option.unit_kerja}
                                        </span>
                                        <span style={{ fontSize: "10px", color: "#666" }}>
                                            {option.uraian_instansi}
                                        </span>
                                    </div>
                                </li>
                            )}
                        />
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <Fieldx
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder={"Cari Data"}
                            value={searchData}
                            onChange={(e) => {
                                setSearchData(e.target.value);  // update state
                                cariData(e.target.value);       // gunakan value terbaru langsung
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
            </div>

            <div className="cardxBody">
                <SnackBarx
                    active={activeAlert}
                    message={messageAlert}
                    color={colorAlert}
                />
                {/* <Button className='btnAdd' variant="contained" size="small">Small</Button> */}
                <div className='btnContainer'>
                    <button onClick={(e) => { e.currentTarget.blur(); openAdd(); setAddMode("ADD"); }} className='btn md primarySoft shaddow1 width150'>
                        <Add sx={{ fontSize: 18 }} />
                        Add Data
                    </button>
                    {/* <button className='btn danger shaddow1'>Add Data</button> <br /> <br />
                    <button className='btn lg warning fullWidth shaddow2'>Add Data</button> */}
                </div>

                {/* LIST ITEM - show 2 columns per row on md+ */}
                <Grid container spacing={1}>
                    {
                        listData.map((data, index) => (
                            <Grid size={{ md: 6, xs: 12 }} key={index}>
                                <div onClick={() => { openSetting(); selectData(data); }}>
                                    <ListDataItems
                                        unit={data.sub_unit_kerja_uraian}
                                        title={`${data.uraian_jns_pencairan} - ${data.uraian} `}
                                        price={data.nilai}
                                    />
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>

                <div className='paginContainer'>
                    <Pagination
                        count={jmlData}
                        page={pageFirst}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined" />
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
                            <Button onClick={(e) => { e.currentTarget.blur(); openDetail(); }} fullWidth variant="outlined" size="small">
                                Detail
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Button onClick={() => { closeSetting(); }} color="warning" fullWidth variant="outlined" size="small">
                                Edit
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            {/* <Button onClick={() => showAlert()} color="error" fullWidth variant="outlined" size="small">
                                Remove
                            </Button> */}
                            <Button onClick={() => removeData()} color="error" fullWidth variant="outlined" size="small">
                                Remove
                            </Button>
                        </Grid>
                    </Grid>

                </SettingDialog>
                {/* ================= SETTING DATA ================= */}

                {/* ================= DETAIL DATA ================= */}
                <DetailData
                    open={openModalDetail}
                    onClose={closeDetail}
                    fullScreen={fullScreen}
                    maxWidth="sm"
                    title="Detail Data"
                    formData={formData}
                    ppn={ppn}
                    pph={pph}
                    tracking={tracking}
                    listFiles={listFiles}
                />
                {/* ================= DETAIL DATA ================= */}


            </div>
        </div>
    )
}

export default VerifikasiDokumen