import * as React from 'react';

interface MenuItem {
    label: string;
    onClick: (index: number) => void;
}

import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";

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
                    <FieldSingle
                        Title={'Uraian'}
                        name='uraian'
                        value={formData.uraian}
                        onChange={handleInputChange}
                        disabledx={true}
                    />
                    <FieldTextArea
                        Title={'Keterangan'}
                        name='keterangan'
                        value={formData.keterangan}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder={'Masukkan keterangan...'}
                        disabledx={true}
                    />
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



const MasterTahapan = () => {
    // ====== FORM STATE ====== 
    const [formData, setFormData] = React.useState({
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
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [openModalDetail, setOpenModalDetail] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');


    const handleClickopenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalDetail = () => {
        setOpenModalDetail(false);
        // Reset form data
        setFormData({
            uraian: '',
            keterangan: ''
        });
    };
    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
        // Reset form data
        setFormData({
            uraian: '',
            keterangan: ''
        });
    };

    const handleSaveData = () => {
        console.log('Data yang akan disimpan:', formData);
        handleCloseModalAdd();
    };

    // ====== ANCHOR ACTIONS ====== 
    const handleDetail = (index, data) => {
        console.log('Detail data index:', index, 'data:', data);
        setOpenModalDetail(true);
    };

    const handleEdit = (index, data) => {
        console.log('Edit data index:', index, 'data:', data);
        setOpenModalAdd(true);
        setFormData({
            uraian: data.uraian || '',
            keterangan: data.keterangan || ''
        });
    };

    const handleDelete = (index, data) => {
        console.log('Delete data index:', index, 'data:', data);
        // Lakukan sesuatu untuk delete
    };

    // Array menu items yang dinamis dengan useMemo
    const menuItems = React.useMemo(() => [
        { label: 'Detail', onClick: handleDetail },
        { label: 'Edit', onClick: handleEdit },
        { label: 'Delete', onClick: handleDelete }
    ], [handleDetail, handleEdit, handleDelete]);
    // ====== ANCHOR ACTIONS ======

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

                <div className="table-wrap" tabIndex={0}>
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
                                [...Array(10)].map((_, index) => {
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
                                                    data={dataItem}
                                                    menuItems={menuItems}
                                                />
                                            </td>
                                            <td className='center'>{index + 1}</td>
                                            <td>Verifikasi Dokumen</td>
                                            <td>-</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className='paginContainer'>
                    <Pagination count={10} color="primary" variant="outlined" />
                </div>

                {/* MODAL DETAIL */}
                <DetailDialog
                    open={openModalDetail}
                    onClose={handleCloseModalDetail}
                    fullScreen={fullScreen}
                    maxWidth={maxWidth}
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
                {/* MODAL DETAIL */}

                {/* MODAL ADD */}
                <AddDialog
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    fullScreen={fullScreen}
                    maxWidth={maxWidth}
                    title="Add"
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSave={handleSaveData}
                />
                {/* MODAL ADD */}




            </div>
        </div>
    )
}

export default MasterTahapan