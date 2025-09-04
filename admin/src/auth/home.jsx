import React from 'react'
import { Grid, Button } from '@mui/material'
// import Grid from '@mui/material/Grid';

import { CloudDownload, YouTube, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Youtubex from '../assets/img/youtube.png';
import Logox from '../assets/img/logox.png';


function Home() {
    const navigate = useNavigate()
    return (
        <div className='singlePage'>
            <Grid container spacing={1}>

                <Grid size={{ md: 6, xs: 12 }}>
                    <div className='singlePageContainer'>
                        <div className='singlePageTextContainer'>
                            <div>

                            </div>
                            <div className='h_Home1'>Selamat datang di</div>
                            {/* <div className='h_Home5'>Temp-React</div> */}
                            <div>
                                <img
                                    src={Logox}
                                    alt="No image"
                                    style={{
                                        width: '100%',
                                        height: "auto",
                                        display: "block",
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: 2 }} className='h_Home2'>Aplikasi ini sebagai tools dalam melakukan pemantauan progress pencairan sekaligus sebagai Dashboard untuk melakukan monitoring dan evaluasi pelaksanaan kegiatan proses pencairan keuangan.</div>
                            {/* <div style={{ marginTop: 15 }} className='h_Home3'>
                                You can also contribute to the development of this application on the page
                            </div>
                            <div className='h_Home4'>
                                <a className='h_Home4' href="https://github.com/lowhanfish/temp_react">https://github.com/lowhanfish/temp_react</a>
                            </div> */}
                            <div>
                                <Button onClick={() => navigate('/Login')} sx={{ marginTop: 2, backgroundColor: 'rgba(0, 106, 255, 0.38)' }} startIcon={<Login />} fullWidth variant="contained">Login</Button>
                            </div>

                        </div>
                    </div>
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                    <div className='singlePageContainer singlePageContainerRight'>
                        <div>
                            <div className='glassFrame shaddow2'>
                                <div className='h_ketTutor'>Silahkan unduh manual book terkait tatacara pengoperasian Aplikasi ini</div>
                                <Button sx={{ marginTop: 2, backgroundColor: 'rgba(87, 5, 163, 0.38)' }} startIcon={<CloudDownload />} fullWidth variant="contained">Download</Button>
                            </div>
                            <div className='glassFrame shaddow2' style={{ marginTop: 25 }}>
                                <div className='h_ketTutor'>Jika anda ingin menonton video tutorial terkait aplikasi ini silahkan click button di bawah</div>
                                {/* <Button sx={{ marginTop: 2, backgroundColor: 'rgba(255, 0, 0, 0.38)' }} startIcon={<YouTube />} fullWidth variant="contained">Tonton</Button> */}

                                <div className='btnRoundTutorContainer'>
                                    <div className='btnYoutube shaddow2 pulsex'>
                                        <a href="">
                                            <img
                                                src={Youtubex}
                                                alt="No image"
                                                style={{
                                                    width: 100,
                                                    height: "auto",
                                                    display: "block",
                                                }}
                                            />

                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>


        </div>
    )
}

export default Home

