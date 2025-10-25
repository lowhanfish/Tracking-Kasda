import { useState, useEffect } from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Clear, Add, Search } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import BasicSelect from '@components/items/BasicSelect';
import axios from "axios";
import useStorex from '@store/index.js'
import { getAllUserGroup } from "@lib/dataFetch.js";

const AddData = ({ handleCloseModalAdd, biodata }) => {

    // Jika biodata mungkin undefined (misalnya untuk mode "Tambah"), berikan nilai default {}
    const safeBiodata = biodata || {};
    var token = localStorage.getItem("authToken");
    const { url } = useStorex()

    const [form, setForm] = useState({
        // Inisialisasi state dengan nilai dari biodata
        id: safeBiodata.id || '',
        nama: safeBiodata.nama || '',
        alamat: safeBiodata.alamat || '',
        email: safeBiodata.email || '',
        hp: safeBiodata.hp || '',
        username: safeBiodata.username || '',
        level: safeBiodata.level || '',
    });
    const [listGroup, setListGroup] = useState([])

    // 💡 FUNGSI HANDLER PERUBAHAN STATE 💡
    const handleChange = (e) => {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    const editData = () => {
        console.log(form)
        // axios.post(url.URL_USER + '/update', JSON.stringify(form), {
        //     headers: {
        //         Authorization: `kikensbatara ${token}`,
        //         "Content-Type": 'application/json'
        //     }
        // }).then(response => {
        //     console.log(response)
        //     alert("Sukses update data..!")
        // }).catch(error => {
        //     alert("Gagal update data..!")
        //     console.log(error)
        // })
    }

    const getUserGroup = async () => {
        const getGroup = await getAllUserGroup(token, url)
        console.log(getGroup)
        setListGroup(getGroup);
    }

    useEffect(() => {
        // console.log(url)
        getUserGroup()
    }, [])

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
                        disabledx={true}
                    />

                    {/* 2. FIELD ALAMAT */}
                    <FieldSingle
                        Title={'Address'}
                        name={'alamat'}
                        value={form.alamat}
                        onChange={handleChange}
                        disabledx={true}
                    />

                    {/* 3. FIELD EMAIL */}
                    <FieldSingle
                        Title={'Email'}
                        name={'email'}
                        value={form.email}
                        onChange={handleChange}
                        disabledx={false}
                    />

                    {/* 4. FIELD HP (Phone Number) */}
                    <FieldSingle
                        Title={'Phone Number'}
                        name={'hp'}
                        value={form.hp}
                        onChange={handleChange}
                        disabledx={false}
                    />



                    <BasicSelect
                        Title="Level Access"
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        options={listGroup.map(item => ({
                            value: item.id,
                            label: item.title // bukan title, tapi label
                        }))}
                    />


                    {/* 5. FIELD USERNAME */}
                    <FieldSingle
                        Title={'Username'}
                        name={'username'}
                        value={form.username}
                        onChange={handleChange}
                        disabledx={false}
                    />

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseModalAdd}>
                    Cancel
                </Button>
                <Button onClick={editData} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </>
    )
}

export default AddData;