
import { useState, Fragment, useEffect } from "react";
import Grid from '@mui/material/Grid';

// import AddIcon from '@mui/icons-material/Add';

import { Dialog, Menu, MenuItem } from '@mui/material';


import { Add, ArrowDropDown } from '@mui/icons-material';
import FieldWithButton from '@components/items/FieldWithButton';
import Anchorx from '@components/items/Anchorx';



import AccessSettingAdd from "./accessSetting/add";
import menuConfig from "../configs/menuConfig";

import axios from "axios";
import useStorex from "../store";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import StopIcon from '@mui/icons-material/Stop';
import Settings from '@mui/icons-material/Settings';


const iconMap = {
    'InboxIcon': InboxIcon,
    'MailIcon': MailIcon,
    'DashboardIcon': DashboardIcon,
    'FiberManualRecordIcon': FiberManualRecordIcon,
    'SettingsIcon': SettingsIcon,
    'PeopleAltIcon': PeopleAltIcon,
    'LogoutIcon': LogoutIcon,
    'StopIcon': StopIcon,
    'Settings': Settings,

    // Tambahkan ikon lain di sini
};



function AccessSetting() {

    const token = localStorage.getItem('authToken');
    const { url } = useStorex()

    const [form, setForm] = useState(null)




    // ====== MAPPING ICON ====== 
    const mapIcon = (data) => {
        return iconMap[data] || null
    }
    // ====== MAPPING ICON ====== 

    // ====== TOGLE SHOW/HIDE ====== 
    const [openParent, setOpenParent] = useState(null);
    const [openChild, setOpenChild] = useState(null);
    // ====== TOGLE SHOW/HIDE ====== 

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
    const [openModalAdd, setOpenModal] = useState(false);
    // const theme = useTheme();
    const [fullScreen, setFullScreen] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModal(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModal(false);
        getData();
    };
    // ====== MODAL ADD ====== 



    // START YOUR CODE =========================================================

    // const [menu, setMenu] = useState(menuConfig)
    const [menu, setMenu] = useState([])
    const [typeEvent, setTypeEvent] = useState("ADD")
    // console.log(menu)


    const getData = () => {
        axios.post(url.URL_MENU + '/view', JSON.stringify({ data: '' }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            setMenu(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };

    const removeData = (id) => {
        axios.post(url.URL_MENU + '/remove', JSON.stringify({ id: id }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then((response) => {
            console.log(response);
            getData()
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    // START YOUR CODE =========================================================

    return (
        <div className="cardx">
            <div className="cardxHeader">
                <Grid container spacing={1}>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldWithButton placeholderx={'Cari Data..'} />
                    </Grid>
                </Grid>
            </div>
            <div className="cardxBody">


                {/* <Button className='btnAdd' variant="contained" size="small">Small</Button> */}
                <div className='btnContainer'>
                    <button onClick={() => {
                        setTypeEvent("ADD")
                        handleClickopenModalAdd();
                    }} className='btn md primarySoft shaddow1 width150'>
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
                                <th style={{ width: '5%' }} scope="col">#</th>
                                <th style={{ width: '5%' }} scope="col">Set</th>
                                <th style={{ width: '5%' }} scope="col">No</th>
                                <th style={{ width: '5%' }} scope="col">Icon</th>
                                <th style={{ width: '35%' }} scope="col">Name</th>
                                <th style={{ width: '25%' }} scope="col">Route</th>
                                <th style={{ width: '30%' }} scope="col">Type</th>
                            </tr>
                        </thead>
                        <tbody className="h_body">

                            <Fragment >

                                {/* const IconComponent = mapIcon(data.icon); */}
                                {
                                    menu.map((data, index) => {

                                        const IconComponent = mapIcon(data.icon);
                                        return (
                                            <Fragment key={index}>
                                                <tr className="rw1">
                                                    <td className="text-center">
                                                        {data.multiple ? (
                                                            <button
                                                                onClick={() => setOpenParent(openParent === index ? null : index)}
                                                                className="btn rad rw1Revert sm">
                                                                {openParent === index ? (
                                                                    <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(-90deg)", transition: "0.2s" }} />
                                                                ) : (
                                                                    <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(0deg)", transition: "0.2s" }} />
                                                                )}
                                                            </button>

                                                        ) : (<></>)}
                                                    </td>
                                                    <td>
                                                        {/* <Anchorx /> */}
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
                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Detail</MenuItem>
                                                                <MenuItem sx={{ fontSize: 12 }} onClick={
                                                                    () => {
                                                                        setTypeEvent("EDIT")
                                                                        setForm(data);
                                                                        handleClickopenModalAdd();
                                                                        handleCloseAnchor();

                                                                    }}>Edit</MenuItem>
                                                                <MenuItem sx={{ fontSize: 12 }} onClick={() => {
                                                                    removeData(data.id)
                                                                    handleCloseAnchor()
                                                                }}>Delete</MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{index + 1}.</td>
                                                    <td className="text-center"><IconComponent sx={{ fontSize: 20 }} /></td>
                                                    <td>{data.title}</td>
                                                    <td>{data.path}</td>
                                                    <td>
                                                        {
                                                            data.multiple ? (
                                                                <>True</>
                                                            ) : (
                                                                <>false</>

                                                            )
                                                        }
                                                    </td>
                                                </tr>

                                                {openParent === index && data.multiple === true && (

                                                    data.children.map((data1, index1) => {
                                                        const IconComponent1 = mapIcon(data1.icon);
                                                        return (
                                                            <Fragment key={index + "." + index1}>
                                                                <tr className="rw2 text-center">
                                                                    <td>
                                                                        {
                                                                            data1.multiple && (
                                                                                <button
                                                                                    onClick={() => setOpenChild(openChild === index + "." + index1 ? null : index + "." + index1)}
                                                                                    className="btn rad rw1Revert sm">
                                                                                    {openChild === index + "." + index1 ? (
                                                                                        <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(-90deg)", transition: "0.2s" }} />
                                                                                    ) : (
                                                                                        <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(0deg)", transition: "0.2s" }} />
                                                                                    )}
                                                                                </button>

                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {/* <Anchorx /> */}

                                                                        <div className='settingContainer'>
                                                                            <button
                                                                                className="btn rad primarySoft sm"
                                                                                onClick={(e) => handleClickAnchor(e, index + "." + index1)}
                                                                            >
                                                                                <Settings sx={{ fontSize: 14 }} />
                                                                            </button>

                                                                            <Menu
                                                                                keepMounted
                                                                                id={`menu-${index + "." + index1}`}
                                                                                anchorEl={openIndex === index + "." + index1 ? anchorEl : null}
                                                                                open={openIndex === index + "." + index1}
                                                                                onClose={handleCloseAnchor}
                                                                                slotProps={{
                                                                                    list: {
                                                                                        'aria-labelledby': `basic-button-${index + "." + index1}`,
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Detail</MenuItem>
                                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Edit</MenuItem>
                                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Delete</MenuItem>
                                                                            </Menu>
                                                                        </div>




                                                                    </td>
                                                                    <td className="text-center">{index1 + 1}</td>
                                                                    <td className="text-center"><IconComponent1 sx={{ fontSize: 16 }} /></td>
                                                                    <td>{data1.title}</td>
                                                                    <td>{data1.path}</td>
                                                                    <td>Data child</td>
                                                                </tr>

                                                                {openChild === index + "." + index1 && data1.multiple === true && (
                                                                    data1.children.map((data2, index2) => {
                                                                        const IconComponent2 = mapIcon(data2.icon);
                                                                        return (
                                                                            <tr key={index + "." + index1 + "." + index2} className="rw3">
                                                                                <td></td>
                                                                                <td className="text-center">
                                                                                    {/* <Anchorx /> */}
                                                                                    <div className='settingContainer'>
                                                                                        <button
                                                                                            className="btn rad primarySoft sm"
                                                                                            onClick={(e) => handleClickAnchor(e, index + "." + index1 + "." + index2)}
                                                                                        >
                                                                                            <Settings sx={{ fontSize: 14 }} />
                                                                                        </button>

                                                                                        <Menu
                                                                                            keepMounted
                                                                                            id={`menu-${index + "." + index1 + "." + index2}`}
                                                                                            anchorEl={openIndex === index + "." + index1 + "." + index2 ? anchorEl : null}
                                                                                            open={openIndex === index + "." + index1 + "." + index2}
                                                                                            onClose={handleCloseAnchor}
                                                                                            slotProps={{
                                                                                                list: {
                                                                                                    'aria-labelledby': `basic-button-${index + "." + index1 + "." + index2}`,
                                                                                                },
                                                                                            }}
                                                                                        >
                                                                                            <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Detail</MenuItem>
                                                                                            <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Edit</MenuItem>
                                                                                            <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Delete</MenuItem>
                                                                                        </Menu>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="text-center">{index2 + 1}</td>
                                                                                <td className="text-center"><IconComponent2 sx={{ fontSize: 8 }} /></td>
                                                                                <td>{data2.title}</td>
                                                                                <td>{data2.path}</td>
                                                                                <td>xx</td>
                                                                            </tr>

                                                                        )
                                                                    }

                                                                    )

                                                                )}

                                                            </Fragment >

                                                        )
                                                    }
                                                    )

                                                )}

                                            </Fragment>
                                        )
                                    }
                                    )

                                }

                            </Fragment>

                        </tbody>
                    </table>
                </div>


                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidth}
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="responsive-dialog-title"
                >
                    <AccessSettingAdd handleCloseModalAdd={handleCloseModalAdd} typeEvent={typeEvent} formx={form} />
                </Dialog>




            </div>
        </div>
    )
}

export default AccessSetting
