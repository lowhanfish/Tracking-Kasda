
import { useState, Fragment, useEffect } from "react";
import Grid from '@mui/material/Grid';

// import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';


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



function AccessSetting() {

    const token = localStorage.getItem('authToken');
    const { url } = useStorex()

    const [form, setForm] = useState({
        id: '',
        number: '',
        title: '',
        icon: '',
        path: '',
        parent: null,
        multiple: 0,
    })


    const iconMap = {
        'InboxIcon': InboxIcon,
        'MailIcon': MailIcon,
        'DashboardIcon': DashboardIcon,
        'FiberManualRecordIcon': FiberManualRecordIcon,
        'SettingsIcon': SettingsIcon,
        'PeopleAltIcon': PeopleAltIcon,
        'LogoutIcon': LogoutIcon,

        // Tambahkan ikon lain di sini
    };

    // ====== MAPPING ICON ====== 
    const mapIcon = (data) => {
        return iconMap[data] || null
    }
    // ====== MAPPING ICON ====== 

    // ====== TOGLE SHOW/HIDE ====== 
    const [openParent, setOpenParent] = useState(null);
    const [openChild, setOpenChild] = useState(null);
    // ====== TOGLE SHOW/HIDE ====== 



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
    };
    // ====== MODAL ADD ====== 

    const [menu, setMenu] = useState(menuConfig)
    // const [menu, setMenu] = useState([])
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
    }

    useEffect(() => {
        // getData();
    }, [])



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
                                                        <Anchorx />
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
                                                            <>
                                                                <tr key={index + "." + index1} className="rw2 text-center">
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
                                                                        <Anchorx />
                                                                    </td>
                                                                    <td className="text-center">{index1 + 1}</td>
                                                                    <td className="text-center"><IconComponent1 sx={{ fontSize: 16 }} /></td>
                                                                    <td>{data1.title}</td>
                                                                    <td>{data1.path}</td>
                                                                    <td>Data child</td>
                                                                </tr>

                                                                {openChild === index + "." + index1 && data1.multiple === true && (
                                                                    data1.children.map((data2, index2) => (
                                                                        <tr key={index + "." + index1 + "." + index2} className="rw3">
                                                                            <td></td>
                                                                            <td className="text-center">
                                                                                <Anchorx />
                                                                            </td>
                                                                            <td className="text-center">{index2 + 1}</td>
                                                                            {/* <td className="text-center"><data2.icon sx={{ fontSize: 8 }} /></td> */}
                                                                            <td className="text-center"></td>
                                                                            <td>{data2.title}</td>
                                                                            <td>{data2.path}</td>
                                                                            <td>xx</td>
                                                                        </tr>

                                                                    ))

                                                                )}

                                                            </>

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




                    <AccessSettingAdd handleCloseModalAdd={handleCloseModalAdd} />




                </Dialog>




            </div>
        </div>
    )
}

export default AccessSetting
