import React, { useEffect, useState } from "react";






import { Grid } from "@mui/material";

import { AccountCircle, AccessTime, CheckCircleOutline, ErrorOutline } from "@mui/icons-material";


import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';
import Anchorx from '@components/items/Anchorx';
import PieChartx from '@components/chart/PieChartx';
import BarChartx from '@components/chart/BarChartx';


HorizontalBars

import ListData from '@components/ListDataUser';
import ListImage from '@components/ListImage';
import Stepperx from '../components/Stepperx';
import LineChartx from '../components/chart/LineChartx';
import axios from "axios";
import useStorex from "@store/index";
import ListDocumentByLimit from "@components/ListDocumentByLimit";
import { getPOST } from "@lib/dataFetch";
import HorizontalBars from "@components/chart/HorizontalBars";
import ListDataItemsDashboard from "@components/ListDataItemsDashboard";




function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}


const Dashboard = () => {

    // const d = new Date();
    // let year = d.getFullYear();

    const token = localStorage.getItem('authToken');
    const { url } = useStorex();
    // console.log("myToken : ", token)

    // ====== ANCHOR ====== 
    const [anchorEls, setAnchorEls] = React.useState({}); // key = index
    const handleClick = (event, index) => {
        setAnchorEls(prev => ({ ...prev, [index]: event.currentTarget }));
    };

    const handleClose = (index) => {
        setAnchorEls(prev => ({ ...prev, [index]: null }));
    };
    // ====== ANCHOR ====== 

    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModal] = React.useState(false);
    // const theme = useTheme();
    const [fullScreen, setFullScreen] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModal(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModal(false);
    };
    // ====== MODAL ADD ====== 


    const [listBar, setListBar] = useState({
        approve: 0,
        proceess: 0,
        reject: 0,
        total: 0,
    });
    const [frekwensiPengajuan, setFrekwensiPengajuan] = useState([]);
    const [pieStatus, setPieStatus] = useState([]);
    const [prosesUsulan, setProsesUsulan] = useState([]);
    const [timeSeriesHistory, setTimeSeriesHistory] = useState([]);

    const [listDocument, setListDocument] = useState([]);
    const [progress, setProgress] = useState([]);

    const [formData, setFormData] = useState({
        tahun: 2025,
        unit_kerja: '',
    })


    const getLoadData = async () => {
        // console.log(token);
        const dataBar = await getPOST(token, url.URL_DASHBOARD + '/bar', formData);
        setListBar({
            approve: dataBar.approve,
            proceess: dataBar.proceess,
            reject: dataBar.reject,
            total: dataBar.total,
        });

        const dataPie = await getPOST(token, url.URL_DASHBOARD + '/pie_status', formData);
        setPieStatus(dataPie);

        const listTahapanx = await getPOST(token, url.URL_DASHBOARD + '/frekwensi_pengajuan', {
            status: 0,
            unit_kerja: formData.unit_kerja,
            tahun: formData.tahun,
        });
        setProsesUsulan(listTahapanx)


        const listDocumentx = await getPOST(token, url.URL_DASHBOARD + '/list_documents', {
            limit: 8,
            unit_kerja: formData.unit_kerja,
            tahun: formData.tahun,
        });
        setListDocument(listDocumentx);
        // console.log("============")
        // console.log(listDocumentx);
        getProgresPengajuan(listDocumentx[0].id, listDocumentx[0].master_jns_pencairan_id);

    }

    const getProgresPengajuan = async (id, master_jns_pencairan_id) => {

        console.log(id)
        const listProgressx = await getPOST(token, url.URL_DASHBOARD + '/progres_pengajuan', {
            id: id,
            master_jns_pencairan_id: master_jns_pencairan_id
        });

        // console.log(listProgressx)
        setProgress(listProgressx)
    }




    useEffect(() => {
        getLoadData();
    }, [])




    return (
        <div className="cardx">
            <div className="cardxHeader gradientPurpleBlue">
                <Grid container spacing={2}>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <span className="titleBarHeader shaddowText">Dashboard</span>
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        {/* <FieldSingle /> */}
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        {/* <FieldAutocomplete /> */}
                    </Grid>
                </Grid>
            </div>
            <div className="cardxBody">

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid size={{ md: 3, xs: 12 }}>
                        <div className='barContainer shaddow1'>
                            <div className='barLeft cyant1'>
                                <AccountCircle className='shaddowText' sx={{ fontSize: 70, color: 'white' }} />
                                <div className='barLeftText shaddowText'>Jml Pengajuan</div>
                            </div>
                            <div className='barRight cyant11'>
                                <span className='barRightText shaddowText'>{listBar.total}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ md: 3, xs: 12 }}>
                        <div className='barContainer shaddow1'>
                            <div className='barLeft bluex1'>
                                <AccessTime className='shaddowText' sx={{ fontSize: 70, color: 'white' }} />
                                <div className='barLeftText shaddowText'>Proccess</div>
                            </div>
                            <div className='barRight bluex11'>
                                <span className='barRightText shaddowText'>{listBar.proceess}</span>
                            </div>
                        </div>
                    </Grid>

                    <Grid size={{ md: 3, xs: 12 }}>
                        <div className='barContainer shaddow1'>
                            <div className='barLeft purpleLight1'>
                                <CheckCircleOutline className='shaddowText' sx={{ fontSize: 70, color: 'white' }} />
                                <div className='barLeftText shaddowText'>Success</div>
                            </div>
                            <div className='barRight purpleLight11'>
                                <span className='barRightText shaddowText'>{listBar.approve}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ md: 3, xs: 12 }}>
                        <div className='barContainer shaddow1'>
                            <div className='barLeft purple1'>
                                <ErrorOutline className='shaddowText' sx={{ fontSize: 70, color: 'white' }} />
                                <div className='barLeftText shaddowText'>Reject</div>
                            </div>
                            <div className='barRight purple11'>
                                <span className='barRightText shaddowText'>{listBar.reject}</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <hr className='hrku1' />

                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='chartContainer shaddow1'>
                            <div className='dashboardTitle'>Proses Usulan</div>
                            {/* <BarChartx /> */}
                            <HorizontalBars
                                valuex={prosesUsulan}

                            />
                        </div>
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='chartContainer shaddow1'>
                            <div className='dashboardTitle'>Status Verifikasi</div>
                            <PieChartx datax={pieStatus} />
                        </div>
                    </Grid>
                </Grid>

                {/* <hr className='hrku1' />
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 12, xs: 12 }}>
                        <div className='chartContainer shaddow1' style={{ paddingBottom: 30 }}>
                            <div className='dashboardTitle'>Time Series Pengajuan</div>
                            <LineChartx />
                        </div>
                    </Grid>

                </Grid> */}

                <hr className='hrku1' />
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='dashboardContainer shaddow1' style={{ paddingRight: 10, height: '450px', overflow: 'auto' }}>
                            <div className='dashboardTitle'>List Pengajuan Terakhir</div>
                            {
                                listDocument.map((data, index) => (
                                    <div key={index} onClick={() => { getProgresPengajuan(data.id, data.master_jns_pencairan_id); }}>
                                        <ListDataItemsDashboard
                                            title={data.uraian}
                                            unit={data.sub_unit_kerja}
                                            price={data.nilai}
                                            status={data.status_temp}
                                        />
                                    </div>
                                ))


                            }
                        </div>
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='dashboardContainer shaddow1' style={{ height: '450px', overflow: 'auto' }}>
                            <div className='dashboardTitle'>Progres Pengajuan</div>

                            <div style={{ paddingLeft: 40, paddingRight: 5, height: 389, overflowY: 'auto' }}>
                                <Stepperx
                                    progress={progress}
                                />

                            </div>

                        </div>
                    </Grid>
                </Grid>

                <hr className='hrku1' />



            </div>
        </div >
    )
}

export default Dashboard