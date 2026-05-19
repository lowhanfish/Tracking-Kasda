import { useEffect, useState, Fragment } from 'react'
import { Fieldx } from '@assets/styling/style'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Checkbox } from "@mui/material";
import { Clear } from '@mui/icons-material';

import { Selectx, MenuItemx } from '@assets/styling/style';

import axios from "axios";
import useStorex from '@store/index.js';

function AccessSettingAdd({ handleCloseModalAdd, typeEvent, formx, getData }) {
    // var pathx = ''
    var pathMenux = ''
    var pathMenuxTahapan = ''

    const token = localStorage.getItem('authToken');
    const { url } = useStorex();

    const [pathy, setPathy] = useState("/add")
    // const [pathMenux, setPathMenux] = useState("/viewMenu")
    const [form, setForm] = useState({
        id: '',
        title: '',
        access_unit: 0,
    })

    const [listTahapan, setListTahapan] = useState([])

    const handleForm = (field) => (e) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: e.target.value
        }));
    };

    // Fungsi untuk menangani perubahan checkbox
    const handleCheckboxChange = (id) => {
        // 1. Ambil list lama, lalu buat salinan barunya (map)
        const newList = listTahapan.map((item) => {

            // 2. Cek: Apakah ini item yang sedang diklik?
            if (item.id === id) {

                // 3. Tentukan status baru (kebalikan dari yang sekarang)
                let statusBaru;
                if (item.status === 1) {
                    statusBaru = 0;
                } else {
                    statusBaru = 1;
                }

                // 4. Kembalikan item dengan status yang sudah diubah
                return { ...item, status: statusBaru };
            }

            // 5. Jika ID tidak cocok, biarkan item apa adanya
            return item;
        });

        // 6. Update state dengan list yang sudah dimodifikasi
        setListTahapan(newList);
    };

    const getHandle = () => {

        // console.log(listTahapan)
        // console.log(listMenu)
        // console.log(pathx)
        console.log("PATH : ", url.URL_GROUP + pathy)
        axios.post(url.URL_GROUP + pathy, JSON.stringify({
            data: form,
            array: listMenu,
            listTahapan: listTahapan,
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then((response) => {
            // console.log(response);
            alert(`DATA SUCCESS ${typeEvent}..!`)
            getData();
        }).catch((error) => {
            // alert(JSON.stringify(error.response.data))
            console.log('ERROR')
            console.log(error)
        })
    }

    const [listMenu, setListMenu] = useState([]);

    const getDataMenu = () => {

        // console.log("UNTUK MENU : ", url.URL_MENU + pathMenux)

        axios.post(url.URL_MENU + pathMenux, JSON.stringify(formx), {
            headers: {
                'Authorization': `kikensbatara ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setListMenu(response.data)
            // console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTahapan = () => {

        const payload = {}

        if (typeEvent === "EDIT") {
            payload.id = formx.id
        }


        axios.post(url.URL_MASTER_TAHAPAN + pathMenuxTahapan, JSON.stringify(payload), {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `kikensbatara ${token}`
            }
        }).then(result => {
            console.log(result.data)
            setListTahapan(result.data);
        }).catch(error => {
            console.log(error)
        })
    }

    // ========================== CHECKBOX ==========================

    // 🔧 helper rekursif untuk update node berdasarkan id
    const updateNode = (nodes, id, field, value) =>
        nodes.map((node) =>
            node.id === id
                ? { ...node, [field]: value }
                : { ...node, children: updateNode(node.children || [], id, field, value) }
        );

    // mirip v-model
    const bindCheckbox = (id, field, setListMenu) => (e) => {
        setListMenu((prev) => updateNode(prev, id, field, e.target.checked));
    };

    // ========================== CHECKBOX ==========================

    useEffect(() => {

        setForm({
            id: '',
            title: '',
            access_unit: 0,
        })

        if (typeEvent === 'ADD') {
            setPathy("/add");
            // setPathMenux('/viewMenu')
            // pathx = "/add"
            pathMenux = "/viewMenu"
            pathMenuxTahapan = "/viewAccessUser"
        } else if (typeEvent === 'EDIT') {
            setPathy("/update")
            // setPathMenux('/viewUpdateMenu')
            // pathx = "/update"
            pathMenux = "/viewUpdateMenu"
            pathMenuxTahapan = "/viewAccessUserEdit"

            // console.log(formx)

            setForm({
                id: formx.id,
                title: formx.title,
                access_unit: formx.access_unit,
            })
        }
        // console.log(typeEvent)
        // console.log("PATH USE EFFECT : ", pathx)
        getDataMenu();
        getTahapan();

    }, [])


    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='headerModalLeft'>Add Group</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={handleCloseModalAdd} aria-label="fingerprint">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">

                    <div className='inputContainer'>
                        <div className='inputText'>Group Name</div>
                        <Fieldx value={form.title} onChange={handleForm('title')} size='small' fullWidth id="outlined-basic" variant="outlined" />
                    </div>
                    <div className='inputContainer'>
                        <div className='inputText'>Akses unit</div>
                        <Selectx
                            labelId="demo-simple-select-label"
                            size='small'
                            fullWidth id="outlined-basic" variant="outlined"
                            value={form.access_unit}
                            onChange={handleForm('access_unit')}
                        >
                            <MenuItemx value={0}>Sub Unit Kerja</MenuItemx>
                            <MenuItemx value={1}>Unit Kerja</MenuItemx>
                            <MenuItemx value={2}>Instansi</MenuItemx>
                        </Selectx>
                    </div>

                    <hr className='hrku3' />

                    <div className="table-wrap" tabIndex="0">
                        <div className='inputText'>Akses Menu</div>
                        <table className="tabelku shaddow2" style={{ width: '100%' }}>
                            <thead className="h_thead shaddowText">
                                <tr>
                                    <th style={{ width: '10%' }} scope="col">No</th>
                                    <th style={{ width: '70%' }} scope="col">Title</th>
                                    <th style={{ width: '5%' }} scope="col">view</th>
                                    <th style={{ width: '5%' }} scope="col">add</th>
                                    <th style={{ width: '5%' }} scope="col">update</th>
                                    <th style={{ width: '5%' }} scope="col">remove</th>
                                </tr>
                            </thead>
                            <tbody className="h_body">
                                {
                                    listMenu.map((data, index) => (
                                        <Fragment key={data.id}>

                                            <tr className='tablex1'>
                                                <td className=''>{index + 1}</td>
                                                {
                                                    data.multiple == 1 ? (
                                                        <>
                                                            <td colSpan={5}>{data.title}</td>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>{data.title}</td>
                                                            <td className='center'><input type="checkbox" checked={data.view} onChange={bindCheckbox(data.id, "view", setListMenu)}></input></td>
                                                            <td className='center'><input type="checkbox" checked={data.add} onChange={bindCheckbox(data.id, "add", setListMenu)}></input></td>
                                                            <td className='center'><input type="checkbox" checked={data.update} onChange={bindCheckbox(data.id, "update", setListMenu)}></input></td>
                                                            <td className='center'><input type="checkbox" checked={data.remove} onChange={bindCheckbox(data.id, "remove", setListMenu)}></input></td>
                                                        </>
                                                    )
                                                }

                                            </tr>

                                            {
                                                data.children.map((data1, index1) => (
                                                    <Fragment key={data1.id}>

                                                        <tr className='tablex2'>
                                                            <td className=''>{index + 1}.{index + 1}</td>

                                                            {
                                                                data1.multiple == 1 ? (
                                                                    <>
                                                                        <td colSpan={5}>{data1.title}</td>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <td>{data1.title}</td>
                                                                        <td className='center'><input checked={data1.view} onChange={bindCheckbox(data1.id, "view", setListMenu)} type="checkbox"></input></td>
                                                                        <td className='center'><input checked={data1.add} onChange={bindCheckbox(data1.id, "add", setListMenu)} type="checkbox"></input></td>
                                                                        <td className='center'><input checked={data1.update} onChange={bindCheckbox(data1.id, "update", setListMenu)} type="checkbox"></input></td>
                                                                        <td className='center'><input checked={data1.remove} onChange={bindCheckbox(data1.id, "remove", setListMenu)} type="checkbox"></input></td>
                                                                    </>
                                                                )
                                                            }
                                                        </tr>
                                                        {
                                                            data1.children.map((data2, index2) => (
                                                                <tr key={data2.id} className='tablex3'>
                                                                    <td className=''>{index + 1}.{index + 1}.{index + 1}</td>
                                                                    <td>- {data2.title}</td>
                                                                    <td className='center'><input type="checkbox" checked={data2.view} onChange={bindCheckbox(data2.id, "view", setListMenu)}></input></td>
                                                                    <td className='center'><input type="checkbox" checked={data2.add} onChange={bindCheckbox(data2.id, "add", setListMenu)}></input></td>
                                                                    <td className='center'><input type="checkbox" checked={data2.update} onChange={bindCheckbox(data2.id, "update", setListMenu)}></input></td>
                                                                    <td className='center'><input type="checkbox" checked={data2.remove} onChange={bindCheckbox(data2.id, "remove", setListMenu)}></input></td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </Fragment>
                                                ))
                                            }
                                        </Fragment>
                                    ))

                                }

                            </tbody>
                        </table>
                    </div>

                    <hr className='hrku3' />

                    <div className="table-wrap" tabIndex="0">
                        <div className='inputText'>Akses Verifikasi</div>
                        <table className="tabelku shaddow2" style={{ width: '100%' }}>
                            <thead className="h_thead shaddowText">
                                <tr>
                                    <th style={{ width: '10%' }} scope="col">No</th>
                                    <th style={{ width: '85%' }} scope="col">Title</th>
                                    <th style={{ width: '5%' }} scope="col">access</th>
                                </tr>
                            </thead>
                            <tbody className="h_body">
                                {
                                    listTahapan.map((data, index) => (
                                        <tr className='tablex3' key={index}>
                                            <td className='text-center'>{index + 1}.</td>
                                            <td>{data.uraian}</td>
                                            <td className='center'>
                                                <input type="checkbox"
                                                    checked={data.status === 1}
                                                    onChange={() => handleCheckboxChange(data.id)}
                                                />
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseModalAdd}>
                    Cancel
                </Button>
                <Button onClick={getHandle} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </>
    )
}

export default AccessSettingAdd