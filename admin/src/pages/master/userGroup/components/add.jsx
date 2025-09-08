import { useEffect, useState, Fragment } from 'react'
import { Fieldx } from '@assets/styling/style'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Checkbox } from "@mui/material";
import { Clear } from '@mui/icons-material';



import { Selectx, MenuItemx } from '@assets/styling/style';

import axios from "axios";
import useStorex from '@store/index.js';




function AccessSettingAdd({ handleCloseModalAdd, typeEvent, formx, getData }) {


    const token = localStorage.getItem('authToken');
    const { url } = useStorex();

    const [pathx, setPathx] = useState("/add")
    const [form, setForm] = useState({
        id: '',
        title: '',
        access_unit: 0,
    })


    const handleForm = (field) => (e) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: e.target.value
        }));
    };
    const handleForm1 = (field, valuex) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: valuex
        }));
    };



    const getHandle = () => {

        console.log(listMenu)
        // axios.post(url.URL_GROUP + pathx, JSON.stringify(form), {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `kikensbatara ${token}`
        //     }
        // }).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     alert(JSON.stringify(error.response.data))
        //     console.log(error)
        // })
    }

    const [listMenu, setListMenu] = useState([]);

    const getDataMenu = () => {

        axios.post(url.URL_MENU + '/viewMenu', JSON.stringify(form), {
            headers: {
                'Authorization': `kikensbatara ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setListMenu(response.data)
            console.log(response)
        }).catch((error) => {
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
        getDataMenu();
        setForm({
            id: '',
            title: '',
            access_unit: 0,
        })

        if (typeEvent === 'ADD') {
            setPathx("/add")
        } else if (typeEvent === 'EDIT') {
            setPathx("/update")
            setForm({
                id: formx.id,
                title: formx.title,
                access_unit: formx.access_unit,
            })
        }
    }, [])


    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='headerModalLeft'>Add User</div>
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



                    <div className="table-wrap" tabIndex="0">
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
                                                <td>{data.title}</td>
                                                <td className='center'><input type="checkbox" checked={data.view} onChange={bindCheckbox(data.id, "view", setListMenu)}></input></td>
                                                <td className='center'><input type="checkbox" checked={data.add} onChange={bindCheckbox(data.id, "add", setListMenu)}></input></td>
                                                <td className='center'><input type="checkbox" checked={data.update} onChange={bindCheckbox(data.id, "update", setListMenu)}></input></td>
                                                <td className='center'><input type="checkbox" checked={data.remove} onChange={bindCheckbox(data.id, "remove", setListMenu)}></input></td>
                                            </tr>

                                            {
                                                data.children.map((data1, index1) => (
                                                    <Fragment key={data1.id}>

                                                        <tr className='tablex2'>
                                                            <td className=''>{index + 1}.{index + 1}</td>
                                                            <td>{data1.title}</td>
                                                            <td className='center'><input checked={data1.view} onChange={bindCheckbox(data1.id, "view", setListMenu)} type="checkbox"></input></td>
                                                            <td className='center'><input checked={data1.add} onChange={bindCheckbox(data1.id, "add", setListMenu)} type="checkbox"></input></td>
                                                            <td className='center'><input checked={data1.update} onChange={bindCheckbox(data1.id, "update", setListMenu)} type="checkbox"></input></td>
                                                            <td className='center'><input checked={data1.remove} onChange={bindCheckbox(data1.id, "remove", setListMenu)} type="checkbox"></input></td>
                                                        </tr>
                                                        {
                                                            data1.children.map((data2, index2) => (
                                                                <tr className='tablex3'>
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
