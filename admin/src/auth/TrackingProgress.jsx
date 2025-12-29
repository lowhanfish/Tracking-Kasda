import React from 'react'
import { Grid, Button } from '@mui/material'
// import Grid from '@mui/material/Grid';

import { CloudDownload, YouTube, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Youtubex from '../assets/img/youtube.png';
import Logox from '../assets/img/logox.png';


function TrackingProgress() {
    const navigate = useNavigate()
    return (
        <div className='singlePage' style={{ position: 'relative', overflow: 'scroll' }}>
            <Grid container spacing={1}>

                <Grid size={{ md: 12, xs: 12 }}>
                    <div className='singlePageContainer-1'>
                        <div className='' style={{ background: 'white', padding: '5%' }}>
                            <div>

                            </div>
                            <div className='h_Home1'>Tracking Progress Pengajuan Anda</div>

                            <div style={{ marginTop: 2 }} className='h_Home2'>Untuk mendapatkan token/kode kegiatan, silahkan menghubungi bendahara pengeluaran dari unit kerja pengusul.</div>

                            <hr className='hrku1' />

                            <div>
                                <Button onClick={() => navigate('/Login')} sx={{ marginTop: 1, backgroundColor: 'rgba(182, 58, 231, 0.38)' }} startIcon={<Login />} fullWidth variant="contained">Tracking Progress Usulan</Button>
                            </div>

                        </div>
                    </div>
                </Grid>


            </Grid>


        </div>
    )
}

export default TrackingProgress

