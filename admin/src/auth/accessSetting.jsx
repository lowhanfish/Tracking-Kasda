import { useState, Fragment, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Dialog, Menu, MenuItem } from '@mui/material';
import { Add, ArrowDropDown } from '@mui/icons-material';
import FieldWithButton from '@components/items/FieldWithButton';
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
};

function AccessSetting() {
    const token = localStorage.getItem('authToken');
    const { url } = useStorex();

    const [form, setForm] = useState({
        id: '',
        number: '',
        title: '',
        icon: '',
        path: '',
        parent: null,
        multiple: 0,
    });

    // ====== MAPPING ICON ====== 
    const mapIcon = (data) => {
        return iconMap[data] || null
    }
    // ====== MAPPING ICON ====== 

    // ====== TOGGLE SHOW/HIDE ====== 
    const [openParent, setOpenParent] = useState(null);
    const [openChild, setOpenChild] = useState(null);
    // ====== TOGGLE SHOW/HIDE ====== 

    // ====== ANCHOR ====== 
    const [anchorEl, setAnchorEl] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpenIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenIndex(null);
    };
    // ====== ANCHOR ======

    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModal] = useState(false);
    const [fullScreen, setFullScreen] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModal(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModal(false);
    };
    // ====== MODAL ADD ====== 

    const [menu, setMenu] = useState([]);

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
    }

    useEffect(() => {
        getData();
    }, []);

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
                <div className='btnContainer'>
                    <button onClick={handleClickopenModalAdd} className='btn md primarySoft shaddow1 width150'>
                        <Add sx={{ fontSize: 18 }} />
                        Add Data
                    </button>
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
                            <Fragment>
                                {
                                    menu.map((data, index) => {
                                        const IconComponent = mapIcon(data.icon);
                                        return (
                                            <Fragment key={index}>
                                                <tr className="rw1">
                                                    <td className="text-center">
                                                        {data.multiple && (
                                                            <button
                                                                onClick={() => setOpenParent(openParent === index ? null : index)}
                                                                className="btn rad rw1Revert sm">
                                                                {openParent === index ? (
                                                                    <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(-90deg)", transition: "0.2s" }} />
                                                                ) : (
                                                                    <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(0deg)", transition: "0.2s" }} />
                                                                )}
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className='settingContainer'>
                                                            <button
                                                                className="btn rad primarySoft sm"
                                                                onClick={(e) => handleClick(e, index)}
                                                            >
                                                                <Settings sx={{ fontSize: 14 }} />
                                                            </button>

                                                            <Menu
                                                                keepMounted
                                                                id={`menu-${index}`}
                                                                anchorEl={openIndex === index ? anchorEl : null}
                                                                open={openIndex === index}
                                                                onClose={handleClose}
                                                                slotProps={{
                                                                    list: {
                                                                        'aria-labelledby': `basic-button-${index}`,
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleClose}>Detail</MenuItem>
                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleClose}>Edit</MenuItem>
                                                                <MenuItem sx={{ fontSize: 12 }} onClick={handleClose}>Delete</MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{index + 1}.</td>
                                                    <td className="text-center"><IconComponent sx={{ fontSize: 20 }} /></td>
                                                    <td>{data.title}</td>
                                                    <td>{data.path}</td>
                                                    <td>{data.multiple ? "True" : "False"}</td>
                                                </tr>
                                            </Fragment>
                                        )
                                    })
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
                    <AccessSettingAdd handleCloseModalAdd={handleCloseModalAdd} />
                </Dialog>
            </div>
        </div>
    )
}

export default AccessSetting;
