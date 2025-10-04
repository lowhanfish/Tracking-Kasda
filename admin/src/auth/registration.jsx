import { useEffect, useState } from 'react';






import { Button, Dialog, Grid, Pagination, IconButton, Menu, MenuItem, InputAdornment } from "@mui/material";

import { Add, Search, Settings } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldAutocomplete from '@components/items/FieldAutocomplete';


import { Fieldx } from '@assets/styling/style'

import AddData from './registration/AddData.jsx'
import axios from 'axios';
import useStorex from '@store/index.js'

import Profile from '@pages/profile.jsx'


const Registration = () => {


    const [listData, setListData] = useState([]);
    const [dataLimit, setDataLimit] = useState(8);
    const [searchData, setSearchData] = useState('');
    const [pageFirst, setPageFirst] = useState(1);
    const [jmlData, setJmlData] = useState(1);

    const token = localStorage.getItem("authToken");
    const { url } = useStorex()

    const getData = () => {

        axios.post(url.URL_USER + '/view', JSON.stringify({
            pageFirst: pageFirst,
            searchData: searchData,
            dataLimit: dataLimit,
        }), {

            headers: {
                'Authorization': `kikensbatara ${token}`,
                'Content-Type': 'application/json'
            }

        }).then(response => {
            console.log(response)
            setListData(response.data.data);
            setJmlData(response.data.jml);
        }).catch(error => {
            console.log(error)
        })


    }

    const cariData = (e) => {
        console.log(e)
        getData();
    }

    const handlePageChange = (event, value) => {
        setPageFirst(value); // update halaman aktif
        getData();           // fetch data halaman baru
    };



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
    }, [searchData, pageFirst])


    return (
        <div className="cardx">
            <div className="cardxHeader">
                <Grid container spacing={1}>
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
                                listData.map((data, index) => (
                                    <tr key={data.username}>
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
                                                    <MenuItem sx={{ fontSize: 12 }} onClick={() => { handleClickopenModalDetail(); handleCloseAnchor() }}>Detail</MenuItem>
                                                    <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Edit Account</MenuItem>
                                                    <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Delete</MenuItem>
                                                </Menu>
                                            </div>




                                        </td>
                                        <td className='center'>{index + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>{data.email}</td>
                                        <td>{data.username}</td>
                                        <td className='center'><span className="badge ok">Active</span></td>
                                    </tr>
                                ))

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



                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidth}
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="responsive-dialog-title"
                >
                    <AddData handleCloseModalAdd={handleCloseModalAdd} />
                </Dialog>
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
                            <Profile />
                        </div>
                    </div>
                </Dialog>






            </div>
        </div>
    )
}

export default Registration