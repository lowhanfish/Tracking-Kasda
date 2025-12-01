import { useEffect, useState } from 'react';
import { TextField, Dialog, Grid, Pagination, IconButton, Menu, MenuItem, InputAdornment } from "@mui/material";

import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import FieldSingle from '@components/items/FieldSingle';
import FieldAutocomplete from '@components/items/FieldAutocomplete';


import { Fieldx, Autocompletex, Popperx } from '@assets/styling/style'

import AddData from './registration/AddData.jsx'
import axios from 'axios';
import useStorex from '@store/index.js'

import Profile from '@components/profile.jsx'
import Loadingx from '../components/Loadingx.jsx';


import { GetUnitKerja } from "@lib/dataFetch.js";
import { indexingPage } from '../lib/index.js';




const Registration = () => {



    const [listData, setListData] = useState([]);
    const [dataLimit, setDataLimit] = useState(8);
    const [searchData, setSearchData] = useState('');
    const [pageFirst, setPageFirst] = useState(1);
    const [jmlData, setJmlData] = useState(1);
    const [loadData, setLoadData] = useState(false);


    var token = localStorage.getItem("authToken");
    var { url } = useStorex()

    const [profile, setProfile] = useState({})

    const getData = () => {

        setLoadData(true);

        const payload = {
            pageFirst: pageFirst,
            searchData: searchData,
            dataLimit: dataLimit,
        };

        console.log("========", selectedUnitKerja)

        if (selectedUnitKerja) {
            payload.id_unit_kerja = selectedUnitKerja.id; // pakai id dari object
        }

        // console.log(payload)

        axios.post(url.URL_USER + '/view', JSON.stringify(payload), {
            headers: {
                'Authorization': `kikensbatara ${token}`,
                'Content-Type': 'application/json'
            }

        }).then(response => {
            // console.log(response.data.data)
            // console.log(response.data)
            setListData([]);
            setListData(response.data.data);
            setJmlData(response.data.jml);
            setLoadData(false);
        }).catch(error => {
            setLoadData(false);
            // console.log(error)
        })


    }

    const cariData = (e) => {
        // console.log(e)
        setPageFirst(1)
        getData();
    }

    const handlePageChange = (event, value) => {
        setPageFirst(value); // update halaman aktif
        getData();           // fetch data halaman baru
    };

    const selectData = (data) => {
        // console.log(data)
        const newProfile = { ...profile, data }
        setProfile(newProfile)
    }

    // ====== ANCHOR ====== 
    const [anchorEl, setAnchorEl] = useState(null);
    const [openIndex, setOpenAnchorIndex] = useState(null);

    const handleClickAnchor = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpenAnchorIndex(index);
    };

    const handleCloseAnchor = () => {
        setAnchorEl(null);
        setOpenAnchorIndex(null);
    };
    // ====== ANCHOR ====== 

    // ====== AUTO COMPLETE ====== 



    const [APIUnitKerja, setAPIUnitKerja] = useState([])
    const [valueUnitKerja, setValueUnitKerja] = useState("");
    const [inputValueUnitKerja, setInputValueUnitKerja] = useState('');
    const [selectedUnitKerja, setSelectedUnitKerja] = useState(null);

    const handleDataUnitKerja = async (data) => {
        const newAPIUnitKerja = await GetUnitKerja(data, token, url);
        setAPIUnitKerja(newAPIUnitKerja);
    };


    // ====== AUTO COMPLETE ====== 


    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModalAdd] = useState(false);
    // const theme = useTheme();
    const [fullScreen, setFullScreen] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    // ====== MODAL ADD ====== 

    // ====== MODAL DETAIL ====== 
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [maxWidthLarge, setMaxWidthLarge] = useState('md');

    const handleClickopenModalDetail = () => {
        setOpenModalDetail(true);
    };
    const handleCloseModalDetail = () => {
        setOpenModalDetail(false)
    }
    // ====== MODAL DETAIL ====== 

    useEffect(() => {
        getData();
        handleDataUnitKerja("");
    }, [selectedUnitKerja, searchData, pageFirst])


    return (
        <div className="cardx">
            <div className="cardxHeader">
                <Grid container spacing={1}>
                    <Grid size={{ md: 4, xs: 12 }}>

                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        {/* <Autocompletex
                            value={valueUnitKerja}
                            onChange={(event, newValue) => setValueUnitKerja(newValue)}
                            inputValue={inputValueUnitKerja}
                            onInputChange={(event, newInputValue) => { setInputValueUnitKerja(newInputValue), handleDataUnitKerja(newInputValue) }}
                            size="small"
                            options={APIUnitKerja}
                            getOptionLabel={(option) => option.unit_kerja || ""}
                            PopperComponent={Popperx}
                            renderInput={(params) => <TextField {...params} />}
                            renderOption={(props, option) => (
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
                        /> */}

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
                            getOptionLabel={(option) => option.unit_kerja || ""}
                            PopperComponent={Popperx}
                            renderInput={(params) => <TextField {...params} />}
                            renderOption={(props, option) => (
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
                                <th style={{ width: '5%' }} scope="col" className='center'>set</th>
                                <th style={{ width: '5%' }} scope="col" className='center'>No</th>
                                <th style={{ width: '30%' }} scope="col">Nama</th>
                                <th style={{ width: '20%' }} scope="col">Email</th>
                                <th style={{ width: '20%' }} scope="col">Username</th>
                                <th style={{ width: '20%' }} scope="col" className='center'>Group</th>
                            </tr>
                        </thead>
                        <tbody className="h_body">
                            {
                                loadData ? (
                                    <tr>
                                        <td colSpan={6}>
                                            <Loadingx />
                                        </td>
                                    </tr>
                                ) : (

                                    listData.map((data, index) => (
                                        <tr className='fade-in' key={index}>
                                            <td>
                                                {/* <Anchorx index={index} /> */}


                                                <div className='settingContainer'>
                                                    <button
                                                        className="btn rad primarySoft sm"
                                                        onClick={(e) => handleClickAnchor(e, index)}
                                                    >
                                                        <Settings sx={{ fontSize: 14 }} />
                                                    </button>

                                                    <Menu
                                                        keepMounted
                                                        id={`menu-${index}`}
                                                        anchorEl={openIndex === index ? anchorEl : null}
                                                        open={openIndex === index}
                                                        onClose={handleCloseAnchor}
                                                        slotProps={{
                                                            list: {
                                                                'aria-labelledby': `basic-button-${index}`,
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem sx={{ fontSize: 12 }} onClick={() => { selectData(data); handleClickopenModalDetail(); handleCloseAnchor() }}>Detail</MenuItem>
                                                        <MenuItem sx={{ fontSize: 12 }} onClick={() => { selectData(data); handleClickopenModalAdd(); handleCloseAnchor() }}>Edit Account</MenuItem>
                                                        <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Delete</MenuItem>
                                                    </Menu>
                                                </div>

                                            </td>
                                            <td className='center'>{indexingPage(pageFirst, dataLimit, index)}</td>
                                            <td>{data.nama}</td>
                                            <td>{data.email}</td>
                                            <td>
                                                <div className='center-items'>
                                                    <PersonIcon sx={{ fontSize: 14, marginRight: 1 }} />
                                                    {data.username}
                                                </div>
                                                <div className='center-items'>
                                                    <KeyIcon sx={{ fontSize: 14, marginRight: 1 }} />
                                                    <span className="tablex4">{data.level_title}</span>

                                                </div>
                                            </td>
                                            <td className='center'><span className="badge ok">Active</span></td>
                                        </tr>
                                    ))
                                )


                            }

                        </tbody>
                    </table>
                </div>

                <div className='paginContainer'>
                    <Pagination
                        count={jmlData}
                        page={pageFirst}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined" />
                </div>


                {/* ========== ADD DATA ========== */}
                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidth}
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="responsive-dialog-title"
                >
                    <AddData biodata={profile.data} handleCloseModalAdd={handleCloseModalAdd} getData={getData} />
                </Dialog>

                {/* ========== DETAIL DATA ========== */}
                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidthLarge}
                    open={openModalDetail}
                    onClose={handleCloseModalDetail}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div className='modalProfile'>
                        <div className='modalProfileExit shaddow2' onClick={handleCloseModalDetail}>x</div>
                        <div>
                            <Profile biodata={profile.data} />
                        </div>
                    </div>
                </Dialog>






            </div>
        </div>
    )
}

export default Registration