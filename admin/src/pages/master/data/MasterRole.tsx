import { useState, useEffect, useMemo } from "react";

// interface MenuItem {
//     label: string;
//     onClick: (index: number) => void;
// }

import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";
import useStorex from "@store/index";
import axios from "axios";


import { Clear, Add } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';
import Anchorx from '@components/items/Anchorx';
import FieldDatex from '@components/items/FieldDatex';
import BasicSelect from '@components/items/BasicSelect';
import Checkboxz from '@components/items/Checkboxz';
import CheckboxzLable from '@components/items/CheckboxLable';
import FieldTextArea from '@components/items/FieldTextArea';
import Loadingx from '@components/Loadingx.jsx';






// ====== DETAIL DIALOG ======
function DetailDialog({ open, onClose, fullScreen, maxWidth, formData, handleInputChange }: any) {
    return (
        <Dialog
            fullWidth={fullScreen}
            maxWidth={maxWidth as any}
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='TextProfileHead shaddowText'>Detail</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={onClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">
                    {/* CONTENT HERE */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
// ====== DETAIL DIALOG ======

// ====== ADD/EDIT DIALOG ======
function AddDialog({ open, onClose, fullScreen, maxWidth, title, formData, handleInputChange, handleSave }: any) {
    return (
        <Dialog
            fullWidth={fullScreen}
            maxWidth={maxWidth as any}
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
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
                <DialogContentText component="div">
                    <FieldSingle
                        Title={'Uraian'}
                        name='uraian'
                        value={formData.uraian}
                        onChange={handleInputChange}
                    />
                    <FieldTextArea
                        Title={'Keterangan'}
                        name='keterangan'
                        value={formData.keterangan}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder={'Masukkan keterangan...'}
                    />

                    <hr className="hrku2" />
                    <div>
                        <div className='inputText' style={{ paddingBottom: 3 }}>
                            Pilih Tahapan
                        </div>
                        <table className="tabelku shaddow2" style={{ width: '100%' }}>
                            <thead className="h_thead shaddowText">
                                <tr>
                                    <th style={{ width: '5%' }} scope="col">set</th>
                                    <th style={{ width: '10%' }} scope="col">No</th>
                                    <th style={{ width: '85%' }} scope="col">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody className="h_body">
                                <tr>
                                    <td>

                                    </td>
                                    <td className='center'>xxxx</td>
                                    <td>yyyyy</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>






                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
// ====== ADD/EDIT DIALOG ======



const MasterRole = () => {
    // ====== FORM STATE ====== 

    const [listData, setListData] = useState([]);
    const [dataLimit, setDataLimit] = useState(8);
    const [searchData, setSearchData] = useState("");
    const [pageFirst, setPageFirst] = useState(1);
    const [jmlData, setJmlData] = useState(1);
    const [loadData, setLoadData] = useState(true);

    const token = localStorage.getItem("authToken");
    var { url } = useStorex();



    const [formData, setFormData] = useState({
        id: '',
        uraian: '',
        keterangan: ''
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };
    // ====== FORM STATE ====== 


    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [titleAdd, setTitleAdd] = useState("Add");
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [fullScreen, setFullScreen] = useState(true);


    const handleClickopenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalDetail = () => {
        setOpenModalDetail(false);
        setFormData({
            id: '',
            uraian: '',
            keterangan: ''
        });
    };
    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
        setFormData({
            id: '',
            uraian: '',
            keterangan: ''
        });
    };


    const viewData = () => {
        setLoadData(true);
        axios.post(url.URL_MASTER_TAHAPAN + '/view', {}, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `kikensbatara ${token}`
            }
        }).then(result => {
            // console.log(result.data);
            setLoadData(false);
            setListData(result.data);
        }).catch(error => {
            setLoadData(false);
            console.log(error)
        })
    }

    const addData = () => {
        setLoadData(true);

        let post_route = "/add"

        if (titleAdd === 'Add') {
            post_route = "/add";
        } else if (titleAdd === 'Edit') {
            post_route = "/edit";
        }

        axios.post(url.URL_MASTER_TAHAPAN + post_route, JSON.stringify(formData), {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `kikensbatara ${token}`
            }
        }).then(result => {
            viewData();
            setOpenModalAdd(false);
            setLoadData(false);
            // console.log(result.data)
        }).catch(error => {
            setLoadData(false);
            console.log(error);
        })



    };

    // ====== ANCHOR ACTIONS ====== 

    const selectData = (data) => {
        console.log(data);
        setFormData({
            id: data.id || 0,
            uraian: data.uraian || '',
            keterangan: data.keterangan || ''
        });
    }


    const handleDetail = (index, data) => {
        setOpenModalDetail(true);
        selectData(data);
    };

    const handleEdit = (index, data) => {
        selectData(data);
        setTitleAdd("Edit")
        setOpenModalAdd(true);
    };

    const handleDelete = (index, data) => {
        setLoadData(true);
        axios.post(url.URL_MASTER_TAHAPAN + "/delete", JSON.stringify(data), {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `kikensbatara ${token}`
            }
        }).then(result => {
            // console.log(result);
            setLoadData(false);
            viewData();
        }).catch(error => {
            setLoadData(false);
            console.log(error);
        })
    };

    // Array menu items yang dinamis dengan useMemo
    const menuItems = useMemo(() => [
        { label: 'Detail', onClick: handleDetail },
        { label: 'Edit', onClick: handleEdit },
        { label: 'Delete', onClick: handleDelete }
    ], [handleDetail, handleEdit, handleDelete]);
    // ====== ANCHOR ACTIONS ======

    // ====== MODAL ADD ====== 


    useEffect(() => {
        viewData();
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
                    <button onClick={() => { handleClickopenModalAdd(); setTitleAdd("Add") }} className='btn md primarySoft shaddow1 width150'>
                        <Add sx={{ fontSize: 18 }} />
                        Add Data
                    </button>
                    {/* <button className='btn danger shaddow1'>Add Data</button> <br /> <br />
                    <button className='btn lg warning fullWidth shaddow2'>Add Data</button> */}
                </div>

                <div className="table-wrap" tabIndex={0}>

                    {
                        loadData ? (
                            <Loadingx />
                        ) : (
                            <table className="tabelku shaddow2" style={{ width: '100%' }}>
                                <thead className="h_thead shaddowText">
                                    <tr>
                                        <th style={{ width: '5%' }} scope="col">set</th>
                                        <th style={{ width: '5%' }} scope="col">No</th>
                                        <th style={{ width: '30%' }} scope="col">Uraian</th>
                                        <th style={{ width: '60%' }} scope="col">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="h_body">
                                    {
                                        listData.map((data, index) => {
                                            // Data item dari tabel
                                            const dataItem = {
                                                id: index + 1,
                                                uraian: 'Verifikasi Dokumen',
                                                keterangan: '-',
                                                status: 'Menunggu'
                                            };

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Anchorx
                                                            index={index}
                                                            data={data}
                                                            menuItems={menuItems}
                                                        />
                                                    </td>
                                                    <td className='center'>{index + 1}</td>
                                                    <td>{data.uraian}</td>
                                                    <td>{data.keterangan}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>

                        )
                    }


                </div>

                <div className='paginContainer'>
                    {/* <Pagination count={10} color="primary" variant="outlined" /> */}
                </div>

                {/* MODAL DETAIL */}
                <DetailDialog
                    open={openModalDetail}
                    onClose={handleCloseModalDetail}
                    fullScreen={fullScreen}
                    maxWidth="md"
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
                {/* MODAL DETAIL */}

                {/* MODAL ADD */}
                <AddDialog
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    fullScreen={fullScreen}
                    maxWidth="sm"
                    title="Add"
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSave={addData}
                />
                {/* MODAL ADD */}
            </div>
        </div>
    )
}

export default MasterRole