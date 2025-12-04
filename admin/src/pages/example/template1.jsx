import * as React from 'react';

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

// ====== ADD/EDIT DIALOG ======
function AddDialog({ open, onClose, fullScreen, maxWidth, title, children, onSave }) {
    return (
        <Dialog
            fullWidth={fullScreen}
            maxWidth={maxWidth}
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
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
                <Button onClick={onSave || onClose} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
// ====== ADD/EDIT DIALOG ======



const Template1 = () => {
    // ====== FORM STATE ====== 
    const [formData, setFormData] = React.useState({
        fieldSingle: '',
        fieldWithButton: '',
        fieldAutocomplete: null,
        fieldDatex: null,
        basicSelect: '',
        fieldTextArea: '',
        checkboxz: false,
        checkboxzLable: false,
        customField1: '',
        customField2: ''
    });

    // Data untuk BasicSelect - bisa dari API atau static
    const basicSelectOptions = [
        { value: 'java', label: 'Java' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'csharp', label: 'C#' },
        { value: 'php', label: 'PHP' }
    ];

    // Data untuk FieldAutocomplete - bisa dari API atau static
    const fieldAutocompleteOptions = [
        { id: 1, label: 'Jakarta', year: 2024 },
        { id: 2, label: 'Surabaya', year: 2024 },
        { id: 3, label: 'Bandung', year: 2024 },
        { id: 4, label: 'Medan', year: 2024 },
        { id: 5, label: 'Semarang', year: 2024 },
        { id: 6, label: 'Makassar', year: 2024 }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handler tambahan untuk autocomplete dan date picker
    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler untuk checkbox
    const handleCheckboxChange = (name, checked) => {
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };
    // ====== FORM STATE ====== 

    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModal] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModal(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModal(false);
        // Reset form data
        setFormData({
            fieldSingle: '',
            fieldWithButton: '',
            fieldAutocomplete: null,
            fieldDatex: null,
            basicSelect: '',
            fieldTextArea: '',
            checkboxz: false,
            checkboxzLable: false,
            customField1: '',
            customField2: ''
        });
    };
    // ====== MODAL ADD ====== 

    // ====== ANCHOR ACTIONS ====== 
    const handleDetail = (index, data) => {
        console.log('Detail data index:', index, 'data:', data);
    };

    const handleEdit = (index, data) => {
        console.log('Edit data index:', index, 'data:', data);
        handleClickopenModalAdd();
    };

    const handleDelete = (index, data) => {
        console.log('Delete data index:', index, 'data:', data);
    };

    // Handler untuk save form
    const handleSaveForm = () => {
        console.log('Form Data yang disimpan:', formData);
        // Di sini Anda bisa melakukan API call atau validasi
        handleCloseModalAdd();
    };

    // Array menu items yang dinamis dengan useMemo
    const menuItems = React.useMemo(() => [
        { label: 'Detail', onClick: handleDetail },
        { label: 'Edit', onClick: handleEdit },
        { label: 'Delete', onClick: handleDelete }
    ], [handleDetail, handleEdit, handleDelete]);
    // ====== ANCHOR ACTIONS ====== 

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

                <div className="table-wrap" tabIndex="0">
                    <table className="tabelku shaddow2" style={{ width: '100%' }}>
                        <thead className="h_thead shaddowText">
                            <tr>
                                <th style={{ width: '5%' }} scope="col">set</th>
                                <th style={{ width: '5%' }} scope="col">No</th>
                                <th style={{ width: '30%' }} scope="col">Nama</th>
                                <th style={{ width: '20%' }} scope="col">Email</th>
                                <th style={{ width: '20%' }} scope="col">Kota</th>
                                <th style={{ width: '20%' }} scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className="h_body">
                            {
                                [...Array(10)].map((_, index) => {
                                    // Data item dari tabel
                                    const dataItem = {
                                        id: index + 1,
                                        nama: 'Galang Aditya',
                                        email: 'galang@example.com',
                                        kota: 'Jakarta',
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
                                            <td>Galang Aditya</td>
                                            <td>galang@example.com</td>
                                            <td>Jakarta</td>
                                            <td><span className="badge warn">Menunggu</span></td>
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

                {/* MODAL ADD */}
                <AddDialog
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    fullScreen={fullScreen}
                    maxWidth={maxWidth}
                    title="Add"
                    onSave={handleSaveForm}
                >
                    <FieldSingle
                        Title={'FieldSingle'}
                        name='fieldSingle'
                        value={formData.fieldSingle}
                        onChange={handleInputChange}
                    />
                    <FieldWithButton
                        Title={'FieldWithButton'}
                        name='fieldWithButton'
                        value={formData.fieldWithButton}
                        onChange={handleInputChange}
                    />

                    <Grid container spacing={1}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <FieldAutocomplete
                                Title={'FieldAutocomplete'}
                                name='fieldAutocomplete'
                                value={formData.fieldAutocomplete}
                                onChange={(e, value) => handleSelectChange('fieldAutocomplete', value)}
                                options={fieldAutocompleteOptions}
                                getOptionLabel={(option) => option?.label || ''}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <FieldDatex
                                Title={'FieldDatex'}
                                name='fieldDatex'
                                value={formData.fieldDatex}
                                onChange={(date) => handleSelectChange('fieldDatex', date)}
                            />
                        </Grid>
                    </Grid>

                    <BasicSelect
                        Title={'BasicSelect'}
                        name='basicSelect'
                        value={formData.basicSelect}
                        onChange={(e) => handleSelectChange('basicSelect', e.target.value)}
                        options={basicSelectOptions}
                    />

                    <FieldTextArea
                        Title={'FieldTextArea'}
                        name='fieldTextArea'
                        value={formData.fieldTextArea}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder={'Masukkan deskripsi atau catatan di sini...'}
                    />

                    <Grid container spacing={1}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <Checkboxz
                                Title={'Checkboxz Without Lable'}
                                name='checkboxz'
                                checked={formData.checkboxz}
                                onChange={(e) => handleCheckboxChange('checkboxz', e.target.checked)}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CheckboxzLable
                                Title={'CheckboxzLable With Lable'}
                                name='checkboxzLable'
                                checked={formData.checkboxzLable}
                                onChange={(e) => handleCheckboxChange('checkboxzLable', e.target.checked)}
                            />
                        </Grid>
                    </Grid>
                </AddDialog>
                {/* MODAL ADD */}




            </div>
        </div>
    )
}

export default Template1