import { useEffect, useState } from 'react';






import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";

import { capitalizeWords } from '@lib/index.js'

import { Clear, Add } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';

import useStorex from '@store/index.js'

import Photo from '@assets/img/Photo.png';
import axios from 'axios';


const Profile = ({ biodata = "" }) => {


    const biodatax = JSON.parse(localStorage.getItem("profile"));

    const biodataz = {
        id: biodatax._id,
        nip: biodatax.profile.nip
    }


    var data = ''
    if (biodata) {
        data = biodata
        // console.log(biodata)
    } else {
        data = biodataz
    }
    // console.log(data)

    const token = localStorage.getItem('authToken');
    const { url } = useStorex();


    const [profilex, setProfilex] = useState({})
    const [listEducations, setListEducations] = useState([])


    const getData = () => {

        axios.post(url.URL_USER + '/detail', JSON.stringify({
            id: data.id,
            nip: data.nip
        }),
            {
                headers: {
                    'Authorization': `kikensbatara ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                console.log(result.data)
                var datax = result.data.profile
                setProfilex(datax)
                setListEducations(result.data.educations)
                // console.log(profilex)
            }).catch(error => {
                console.log(error)
            })
    }

    // ====== ANCHOR ====== 
    const [anchorEls, setAnchorEls] = useState({}); // key = index

    const handleClick = (event, index) => {
        setAnchorEls(prev => ({ ...prev, [index]: event.currentTarget }));
    };

    const handleClose = (index) => {
        setAnchorEls(prev => ({ ...prev, [index]: null }));
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
    };
    // ====== MODAL ADD ====== 


    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="cardx">

            <div className="cardxBody">
                <div className='ProfileContainer'>
                    <div className='ProfileBackground gradientPurpleBlue'></div>
                    <div className='ProfilePhoto'>
                        <img className='ProfilePhotoItem shaddow1' src={Photo} alt="" />
                    </div>
                </div>

                <div className='TextProfileContainer'>
                    <Grid container spacing={1} sx={{ paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}>
                        <Grid size={{ md: 6, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Profile</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Name</div>
                                <div className='TextProfileLeftVal'>{capitalizeWords(profilex.nama)}</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Company</div>
                                <div className='TextProfileLeftVal'>
                                    {capitalizeWords(profilex.unit_kerja)}
                                </div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Job title</div>
                                <div className='TextProfileLeftVal'>
                                    {capitalizeWords(profilex.jabatan)}
                                </div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Primary industry</div>
                                <div className='TextProfileLeftVal'>Government</div>
                            </div>
                            {/* <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>xxxxx</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div> */}


                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Contact</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Phone</div>
                                <div className='TextProfileLeftVal'>{profilex.hp}</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>email</div>
                                <div className='TextProfileLeftVal'>{profilex.email}</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Address</div>
                                <div className='TextProfileLeftVal'>{profilex.alamat}</div>
                            </div>

                        </Grid>


                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Educations</div>
                            </div>

                            {
                                listEducations.map((data, index) => (

                                    <div key={index} className='TextProfileLeftContainer'>
                                        <div className='TextProfileLeftTitle '>{data.keterangan_pendidikan}</div>
                                        <div className='TextProfileLeftVal capitalFirst'>{capitalizeWords(data.jurusan)} - {capitalizeWords(data.nm_sekolah)} ({data.thn_masuk} – {data.thn_lulus})</div>

                                    </div>
                                ))
                            }



                        </Grid>
                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Work Experience</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>xxxxx</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div>

                        </Grid>



                    </Grid>
                </div>


            </div>
        </div>
    )
}

export default Profile