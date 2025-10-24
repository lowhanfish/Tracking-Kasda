import { useState } from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Clear, Add, Search } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import BasicSelect from '@components/items/BasicSelect';


const AddData = ({ handleCloseModalAdd, biodata }) => {

    // Jika biodata mungkin undefined (misalnya untuk mode "Tambah"), berikan nilai default {}
    const safeBiodata = biodata || {};

    const [form, setForm] = useState({
        // Inisialisasi state dengan nilai dari biodata
        id: safeBiodata.id || '',
        nama: safeBiodata.nama || '',
        alamat: safeBiodata.alamat || '',
        email: safeBiodata.email || '',
        hp: safeBiodata.hp || '',
        username: safeBiodata.username || '',
        // Tambahkan password secara terpisah karena tidak ada di biodata awal
        password: '',
        confirmPassword: '',
    });

    // 💡 FUNGSI HANDLER PERUBAHAN STATE 💡
    const handleChange = (e) => {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
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

                    {/* 1. FIELD NAMA */}
                    <FieldSingle
                        Title={'Name'}
                        name={'nama'}          // Kunci di dalam state 'form'
                        value={form.nama}       // Nilai saat ini dari state
                        onChange={handleChange} // Fungsi untuk memperbarui state
                    />

                    {/* 2. FIELD ALAMAT */}
                    <FieldSingle
                        Title={'Address'}
                        name={'alamat'}
                        value={form.alamat}
                        onChange={handleChange}
                    />

                    {/* 3. FIELD EMAIL */}
                    <FieldSingle
                        Title={'Email'}
                        name={'email'}
                        value={form.email}
                        onChange={handleChange}
                    />

                    {/* 4. FIELD HP (Phone Number) */}
                    <FieldSingle
                        Title={'Phone Number'}
                        name={'hp'}
                        value={form.hp}
                        onChange={handleChange}
                    />

                    <BasicSelect Title={'Level Access'} />

                    {/* 5. FIELD USERNAME */}
                    <FieldSingle
                        Title={'Username'}
                        name={'username'}
                        value={form.username}
                        onChange={handleChange}
                    />

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
        </>
    )
}

export default AddData;