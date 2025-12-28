import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton, Breakpoint, Menu, MenuItem, InputAdornment, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


import Clear from '@mui/icons-material/Clear';
import Search from '@mui/icons-material/Search';

import ListDataItems from '@components/ListDataItems';

import { getPOST } from "@lib/dataFetch.js";
import useStorex from '@store/index';
import SnackBarx from '@components/items/SnackBar';
import DetailData from '@components/DetailData';
import BasicSelect from '@components/items/BasicSelect';
import { GetUnitKerja } from "@lib/dataFetch.js";
import ApproveDialog from './components/verifikasiDokumen/ApproveDialog';
import Swal from 'sweetalert2';
import { Fieldx, Autocompletex, Popperx } from '@assets/styling/style'


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

    const [approveComment, setApproveComment] = useState('');

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
    const [loading, setLoading] = useState(false);
    const [approvePath, setApprovePath] = useState("approve")

    const [tahapanActive, setTahapanActive] = useState({
        id: 0,
        uraian: '',
    });

    const [listTahapan, setListTahapan] = useState([])

    // ====== AUTO COMPLETE ====== 

    const [APIUnitKerja, setAPIUnitKerja] = useState([])
    const [inputValueUnitKerja, setInputValueUnitKerja] = useState('');
    const [selectedUnitKerja, setSelectedUnitKerja] = useState(null);

    const handleDataUnitKerja = async (data) => {
        const newAPIUnitKerja = await GetUnitKerja(data, token, url);
        setAPIUnitKerja(newAPIUnitKerja);
    };

    const [activeAlert, SetActiveAlert] = useState(false);
    const [messageAlert, SetMessageAlert] = useState("");
    const [colorAlert, SetColorAlert] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const [formData, setFormData] = useState({
        id: '',
        uraian: '',
        master_jns_pencairan_id: '',
        nilai: 0,
        sub_unit_kerja: profile.profile.sub_unit_kerja_id,
        master_tahapan_id: tahapanId,
    });

    const [filterStatus, setFilterStatus] = useState(0);

    const OptionsFilter = [
        { value: 0, label: "Proses" },
        { value: 1, label: "Diterima" },
        { value: 2, label: "Dikembalikan" },
    ]

    const viewData = async () => {

        setLoading(true);

        const payload = {
            pageFirst: pageFirst,
            searchData: searchData,
            dataLimit: dataLimit,
            master_tahapan_id: tahapanActive.id,
            id_unit_kerja: '',
            status: filterStatus,
        };

        // console.log("========", selectedUnitKerja)

        if (selectedUnitKerja) {
            payload.id_unit_kerja = selectedUnitKerja.id; // pakai id dari object
        }

        const listDatax = await getPOST(token, url.URL_VERIFICATION + '/view', payload);

        setListData(listDatax.data);
        setJmlData(listDatax.jml);
        setLoading(false);
        console.log(listDatax)
    }

    const approveData = async (files: any) => {
        var status = '0';

        if (approvePath === 'approve') {
            status = '1'
        } else {
            status = '2'
        }


        if (!approveComment || approveComment === '<p><br></p>') {
            alert("Mohon isi catatan persetujuan");
            return;
        }
        // Build FormData similar to saveData in RegistrasiDokumen
        const formDataToSend = new FormData();
        formDataToSend.append('id', formData.id);
        formDataToSend.append('catatan', approveComment);
        formDataToSend.append('status', status);
        formDataToSend.append('master_tahapan_id', tahapanActive.id.toString());
        formDataToSend.append('master_jns_pencairan_id', formData.master_jns_pencairan_id);
        formDataToSend.append('approvePath', approvePath);

        try {
            // attach files if any
            if (files && Array.isArray(files)) {
                files.forEach((f, idx) => {
                    formDataToSend.append('files', f);
                });
            }
            // If ApproveDialog passed files via onSave, it will be provided as argument
            // But here we expect caller to pass files when invoking approveData(files)
            // If no files provided, this will simply skip adding attachments.
            // (The caller passes files array; see ApproveDialog invocation change.)
            // Send to verification approve endpoint
            const res = await axios.post(`${url.URL_VERIFICATION}/approve`, formDataToSend, {
                headers: {
                    'Authorization': `kikensbatara ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200 || res.status === 201) {

                if (approvePath === 'approve') {
                    SetAlert('Data berhasil disetujui', 'success');
                } else {
                    SetAlert('Data berhasil dikembalikan', 'warning');
                }

                closeApprove();
                setApproveComment('');
                loadDataRef();
                viewData();
            } else {
                SetAlert('Gagal menyetujui data', 'error');
            }
        } catch (err) {
            console.error('Approve error', err);
            SetAlert('Terjadi kesalahan saat menyetujui', 'error');
        }
    };

    const SetAlert = (message, color) => {
        SetColorAlert(color)
        SetMessageAlert(message)
        SetActiveAlert(true);
        setTimeout(() => {
            SetActiveAlert(false);
        }, 2000);
    }

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

    // ====== MODAL APPROVE ======
    const [openModalApprove, setOpenModalApprove] = useState(false);
    const openApprove = () => setOpenModalApprove(true);
    const closeApprove = () => setOpenModalApprove(false);

    // ====== MODAL DETAIL ======
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const openDetail = () => setOpenModalDetail(true);
    const closeDetail = () => setOpenModalDetail(false);

    // ====== MODAL ADD ======
    const [fullScreen, setFullScreen] = useState(false);
    // const [maxWidth, setMaxWidth] = useState<Breakpoint | false>('md');
    // ====== MODAL ADD ======


    const handleSetTahapanActive = (id, uraian) => {
        setTahapanActive({
            id: id,
            uraian: uraian
        })
    }

    const loadDataRef = async () => {
        const listTahapanx = await getPOST(token, url.URL_DOCUMENT + '/viewTahapanByDocument', {
            status: filterStatus,
        });
        setListTahapan(listTahapanx);
        return listTahapanx;
    }

    const loadTahapan = async () => {
        const list = await loadDataRef();
        if (Array.isArray(list) && list.length > 0) {
            handleSetTahapanActive(list[0].id, list[0].uraian);
        } else {
            setTahapanActive({ id: 0, uraian: '' });
        }
    }

    // Ambil data tahapan hanya sekali saat mount
    useEffect(() => {
        handleDataUnitKerja("");
    }, []);



    // Panggil loadDataRef setiap kali filterStatus berubah
    useEffect(() => {
        loadTahapan();
    }, [filterStatus]);

    // Panggil viewData setiap kali tahapanActive, selectedUnitKerja, searchData, atau pageFirst berubah
    useEffect(() => {
        viewData();
    }, [tahapanActive, selectedUnitKerja, searchData, pageFirst]);




    return (
        <div className="cardx">

            <div className="cardxHeader">
                <Grid container spacing={1}>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <BasicSelect
                            value={filterStatus}
                            options={OptionsFilter as any}
                            onChange={e => setFilterStatus(e.target.value)}
                        />
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
                    {
                        listTahapan.map((data, index) => (
                            <button onClick={() => { handleSetTahapanActive(data.id, data.uraian); viewData() }} key={index} className=''>
                                <span className='h_notif1'>{data.uraian}</span>
                                {
                                    data.total > 0 && (
                                        <span className='h_notif'> ({data.total})</span>
                                    )
                                }
                            </button>
                        ))
                    }
                </div>
                <span className='TextProfileHead1 shaddowText'>
                    {tahapanActive.uraian}

                </span>
                <hr className='hrku2' />

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
                                        status={data.status_tracking}
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
                            <Button onClick={(e) => { e.currentTarget.blur(); setApprovePath('approve'); closeSetting(); openApprove(); }} color="success" fullWidth variant="outlined" size="small">
                                Approve
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Button onClick={(e) => { e.currentTarget.blur(); setApprovePath('reject'); closeSetting(); openApprove(); }} color="error" fullWidth variant="outlined" size="small">
                                Reject
                            </Button>
                        </Grid>
                    </Grid>

                </SettingDialog>
                {/* ================= SETTING DATA ================= */}

                {/* ================= APPROVE DATA ================= */}

                <ApproveDialog
                    open={openModalApprove}
                    onClose={closeApprove}
                    fullScreen={fullScreen}
                    maxWidth="sm"
                    title={approvePath === `approve` ? 'Approve' : 'Reject'}
                    onSave={approveData}
                    // Tambahkan ini:
                    value={approveComment}
                    onChange={setApproveComment}
                    approvePath={approvePath}
                />


                {/* ================= APPROVE DATA ================= */}

                {/* ================= DETAIL DATA ================= */}
                <DetailData
                    open={openModalDetail}
                    onClose={closeDetail}
                    fullScreen={fullScreen}
                    maxWidth="sm"
                    title="Detail Data"
                    formData={formData}
                />
                {/* ================= DETAIL DATA ================= */}

            </div>
        </div>
    )
}

export default VerifikasiDokumen