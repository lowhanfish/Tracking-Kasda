import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
import SnackBarx from '@components/items/SnackBar';

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

function AddDialog({ open, onClose, fullScreen, maxWidth, title, children, onSave }: any) {
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
                <Button onClick={onSave} autoFocus>Save</Button>
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
    const profile = JSON.parse(localStorage.getItem('profile'));




    const [listData, setListData] = useState([]);
    const [dataLimit, setDataLimit] = useState(8);
    const [searchData, setSearchData] = useState('');
    const [pageFirst, setPageFirst] = useState(1);
    const [jmlData, setJmlData] = useState(1);
    const [loadData, setLoadData] = useState(false);

    const [activeAlert, SetActiveAlert] = useState(false);
    const [messageAlert, SetMessageAlert] = useState("");
    const [colorAlert, SetColorAlert] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const [listPPN, setListPPN] = useState([]);
    const [listPPH, setListPPH] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [listJnsPencairan, setListJnsPencairan] = useState([]);

    const [addMode, setAddMode] = useState("ADD");

    const [formData, setFormData] = useState({
        id: '',
        uraian: '',
        master_jns_pencairan_id: '',
        nilai: 0,
        sub_unit_kerja: profile.profile.sub_unit_kerja_id,
    });

    const [file, setFile] = useState(null);
    const [ppn, setPpn] = useState([]);
    const [pph, setPph] = useState([]);
    const [jnsPencairan, setJnsPencairan] = useState('');
    const [besaranAnggaran, setBesaranAnggaran] = useState('');
    const [loading, setLoading] = useState(false);

    const pushPPH = (event) => {
        // event.target.value adalah value dari MenuItem
        const selectedValue = event.target.value;
        const selectedItem = listPPH.find(item => item.value === selectedValue);

        console.log(selectedItem)

        if (selectedItem) {
            const newItem = {
                ...selectedItem,
                // id: Date.now() // Unique ID untuk setiap item
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

    const getValue = (value, name) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const viewData = async () => {

        setLoading(true);
        const listDatax = await getPOST(token, url.URL_DOCUMENT + '/view',
            {
                pageFirst: pageFirst,
                searchData: searchData,
                dataLimit: dataLimit,
            }
        );
        setListData(listDatax);
        setLoading(false);
        console.log(listDatax)


    }

    const saveData = async () => {
        var pathx = '';
        var sub_unit_kerja: '';

        if (addMode === "ADD") {
            pathx = '/add'
            sub_unit_kerja = profile.profile.sub_unit_kerja_id
        } else {
            sub_unit_kerja = formData.sub_unit_kerja;
            pathx = '/edit'
        }

        console.log(`${url.URL_DOCUMENT}${pathx}`)

        try {
            setLoading(true);

            // Membuat FormData untuk mengirim file
            const formDataToSend = new FormData();

            // Menambahkan formData ke FormData
            formDataToSend.append('id', formData.id);
            formDataToSend.append('uraian', formData.uraian);
            formDataToSend.append('sub_unit_kerja', sub_unit_kerja);
            formDataToSend.append('master_jns_pencairan_id', formData.master_jns_pencairan_id);
            formDataToSend.append('nilai', formData.nilai.toString());

            // Menambahkan PPN array
            ppn.forEach((item, index) => {
                formDataToSend.append(`ppn[${index}][id]`, item.id);
                formDataToSend.append(`ppn[${index}][label]`, item.label);
                formDataToSend.append(`ppn[${index}][nilai]`, item.nilai);
            });

            // Menambahkan PPH array
            pph.forEach((item, index) => {
                formDataToSend.append(`pph[${index}][id]`, item.id);
                formDataToSend.append(`pph[${index}][label]`, item.label);
                formDataToSend.append(`pph[${index}][nilai]`, item.nilai);
            });

            // Menambahkan file
            if (file && Array.isArray(file)) {
                file.forEach((f, index) => {
                    formDataToSend.append('files', f);
                });
            }

            // Melakukan POST request ke backend
            const response = await axios.post(
                `${url.URL_DOCUMENT}${pathx}`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );


            // Jika berhasil, tampilkan notifikasi dan tutup modal
            if (response.status === 200 || response.status === 201) {

                SetAlert("Data berhasil di simpan", "success");
                closeAdd();

                // Reset form
                setFormData({
                    id: '',
                    uraian: '',
                    sub_unit_kerja: profile.profile.sub_unit_kerja_id,
                    master_jns_pencairan_id: '',
                    nilai: 0,
                });
                setPpn([]);
                setPph([]);
                setFile(null);
            }
        } catch (error) {
            console.error('Error saat menyimpan data:', error);
            SetAlert("Gagal menyimpan data..!", "error");
        } finally {
            viewData();
        }
    }

    const removeData = async () => {
        await getPOST(token, url.URL_DOCUMENT + '/delete', formData);
        SetAlert("Data berhasil di hapus", "success");
        viewData();
        closeSetting();
    }

    const removeFileDb = async (index, data) => {
        await getPOST(token, url.URL_FILES + '/delete', data);
        const dataDummy = [...listFiles];  // Buat copy array
        dataDummy.splice(index, 1);
        setListFiles(dataDummy);  // Sekarang React detect perubahan
    }

    const selectData = (data) => {



        setFormData({
            id: data.id,
            uraian: data.uraian,
            master_jns_pencairan_id: data.master_jns_pencairan_id,
            nilai: data.nilai,
            sub_unit_kerja: data.sub_unit_kerja,
        })
        setPpn(data.ppn);
        setPph(data.pph);
        setListFiles(data.files);
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
                <SnackBarx
                    active={activeAlert}
                    message={messageAlert}
                    color={colorAlert}
                />
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
                            <Button onClick={() => removeData()} color="error" fullWidth variant="outlined" size="small">
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
                    onSave={saveData}
                >
                    <FieldSingle
                        Title={'Nama Kegiatan'}
                        value={formData.uraian}
                        onChange={(e) => getValue(e.target.value, 'uraian')}
                    />

                    <Grid container spacing={1}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <BasicSelect
                                Title='Jenis Pencairan'
                                options={listJnsPencairan}
                                value={formData.master_jns_pencairan_id}
                                onChange={(e) => getValue(e.target.value, 'master_jns_pencairan_id')}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <FieldSingle
                                type='number'
                                Title={'Besaran Anggaran'}
                                value={formData.nilai}
                                onChange={(e) => getValue(e.target.value, 'nilai')}
                            />
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
                                                        <td>{item.nilai}%</td>
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

                    <Grid container spacing={1}>
                        <div className='inputText'>
                            Upload File Lampiran (PDF/Gambar)
                        </div>

                        <Grid size={{ md: 12, xs: 12 }}>
                            <FieldSingle
                                type='file'
                                name='file'
                                accept='.pdf,image/*'
                                multiple
                                onChange={handleFileUpload}
                            />
                        </Grid>
                    </Grid>

                    {
                        file && Array.isArray(file) && file.length > 0 && (
                            <Grid container spacing={1} style={{ marginTop: 10 }}>
                                <Grid size={{ md: 12, xs: 12 }}>
                                    <div className="table-wrap">
                                        <table className="tabelku shaddow2" style={{ width: '100%' }}>
                                            <thead className="h_thead shaddowText">
                                                <tr>
                                                    <th style={{ width: '5%' }} scope="col">No</th>
                                                    <th style={{ width: '90%' }} scope="col">Nama File</th>
                                                    <th style={{ width: '5%' }} scope="col">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="h_body">
                                                {
                                                    file.map((f: any, index: number) => (
                                                        <tr key={index}>
                                                            <td className='center'>{index + 1}.</td>
                                                            <td>{f.name}</td>
                                                            <td>
                                                                <button
                                                                    className='btn sm danger shaddow1'
                                                                    onClick={() => removeFile(index)}
                                                                >
                                                                    <CloseIcon sx={{ fontSize: 18 }} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Grid>
                            </Grid>
                        )
                    }

                    <hr className='hrku2' />


                    {
                        addMode === "EDIT" && (
                            <Grid container spacing={1}>
                                <div className='inputText'>
                                    FILE LAMPIRAN SAAT INI
                                </div>

                                <Grid size={{ md: 12, xs: 12 }}>
                                    <table className="tabelku shaddow2" style={{ width: '100%' }}>
                                        <thead className="h_thead shaddowText">
                                            <tr>
                                                <th style={{ width: '5%' }} scope="col">No</th>
                                                <th style={{ width: '90%' }} scope="col">Nama File</th>
                                                <th style={{ width: '5%' }} scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="h_body">
                                            {
                                                listFiles.length < 1 ? (
                                                    <tr>
                                                        <td colSpan={3} className='center'>
                                                            Tidak ada file ..
                                                        </td>

                                                    </tr>
                                                ) : (
                                                    listFiles.map((DataFile, indexFile) => (
                                                        <tr key={indexFile}>
                                                            <td className='center'>{indexFile + 1}.</td>
                                                            <td>
                                                                <div>
                                                                    {DataFile.title}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={() => { removeFileDb(indexFile, DataFile) }}
                                                                    className='btn sm danger shaddow1'
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
                                </Grid>
                            </Grid>
                        )

                    }






                    <hr className='hrku2' />

                </AddDialog>
                {/* ================= ADD DATA ================= */}

            </div>
        </div>
    )
}

export default RegistrasiDokumen