import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material'
// import Grid from '@mui/material/Grid';

import { Search, YouTube, Login, ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Youtubex from '../assets/img/youtube.png';
import Logox from '../assets/img/logox.png';
import useStorex from '@store/index';
import axios from 'axios';



function TrackingProgress() {
    const navigate = useNavigate()

    const { url } = useStorex()
    const [id, setId] = useState("");
    const [listData, setListData] = useState([]);

    const getOneData = () => {

        // console.log(id)

        axios.post(url.URL_PUBLISH_TRACKING + "/", JSON.stringify({ code: id }), {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(result => {
            console.log(result);
            setListData(result.data)
        }).catch(err => {
            console.log(err)
        })


    }


    return (
        <div className='singlePage' style={{ position: 'relative', overflow: 'scroll' }}>
            <Grid container spacing={1}>

                <Grid size={{ md: 12, xs: 12 }}>
                    <div className='singlePageContainer-1'>
                        <div className='back-text' onClick={() => navigate('/')}>
                            <ArrowBackIosNew />
                            <span>Back to Landing Page</span>
                        </div>
                        <div className='' style={{ background: 'white', padding: '5%' }}>
                            <div>

                            </div>
                            <div className='h_Home1'>
                                Tracking Progress Pengajuan Anda
                            </div>

                            <div style={{ marginTop: 2 }} className='h_Home2'>Untuk mendapatkan token/kode kegiatan, silahkan menghubungi bendahara pengeluaran dari unit kerja pengusul.</div>

                            <hr className='hrku1' />

                            <div className="input-groupx">
                                <input
                                    type="text"
                                    className="input-fieldx"
                                    placeholder="Masukkan Kode/Token Usulan..."
                                    value={id}
                                    onChange={(e) => { setId(e.target.value) }}
                                />

                                <Button onClick={() => getOneData()} sx={{ marginTop: 1, backgroundColor: 'rgba(182, 58, 231, 0.38)' }} startIcon={<Search />} variant="contained"></Button>


                            </div>


                            <hr className='hrku2' />


                            {
                                listData.map((data, index) => (
                                    <div style={{ marginTop: 10 }}>
                                        <div className='TextProfileLeftContainer'>
                                            <div className='TextProfileLeftTitle'>Unit Kerja Pengusul</div>
                                            <div className='TextProfileLeftVal' style={{ paddingTop: 3 }}>{data.unit_kerja_uraian}</div>
                                        </div>
                                        <div className='TextProfileLeftContainer'>
                                            <div className='TextProfileLeftTitle'>Nama Kegiatan</div>
                                            <div className='TextProfileLeftVal' style={{ paddingTop: 3 }}>{data.uraian}</div>
                                        </div>
                                        <div className='TextProfileLeftContainer'>
                                            <div className='TextProfileLeftTitle'>Tanggal Pengajuan</div>
                                            <div className='TextProfileLeftVal' style={{ paddingTop: 3 }}>{data.createdAt}</div>
                                        </div>

                                    </div>

                                ))
                            }



                        </div>
                    </div>
                </Grid>


            </Grid>


        </div>
    )
}

export default TrackingProgress

