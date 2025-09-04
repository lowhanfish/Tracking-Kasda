import * as React from 'react';






import { Grid } from "@mui/material";

import { AccountCircle, AccessTime, CheckCircleOutline, ErrorOutline } from "@mui/icons-material";


import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';
import Anchorx from '@components/items/Anchorx';
import PieChartx from '@components/chart/PieChartx';
import BarChartx from '@components/chart/BarChartx';






import ListData from '@components/ListData';
import ListImage from '@components/ListImage';
import Stepperx from '../components/Stepperx';
import LineChartx from '../components/chart/LineChartx';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}





const Template1 = () => {

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

    return (
        <div className="cardx">
            <div className="cardxHeader gradientPurpleBlue">
                <Grid container spacing={2}>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldWithButton placeholderx={'Cari Data..'} />
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldSingle />
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldAutocomplete />
                    </Grid>
                </Grid>
            </div>
            <div className="cardxBody">

                <Grid container spacing={1} sx={{ marginTop: 2 }}>
                    <Grid size={{ md: 3, xs: 12 }}>
                        <div className='barContainer shaddow1'>
                            <div className='barLeft cyant1'>
                                <AccountCircle className='shaddowText' sx={{ fontSize: 70, color: 'white' }} />
                                <div className='barLeftText shaddowText'>User</div>
                            </div>
                            <div className='barRight cyant11'>
                                <span className='barRightText shaddowText'>100</span>
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
                                <span className='barRightText shaddowText'>100</span>
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
                                <span className='barRightText shaddowText'>100</span>
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
                                <span className='barRightText shaddowText'>100</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <hr className='hrku1' />

                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='chartContainer shaddow1'>
                            <div className='dashboardTitle'>Bar Chart</div>
                            <BarChartx />
                        </div>
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='chartContainer shaddow1'>
                            <div className='dashboardTitle'>Pie Chart</div>
                            <PieChartx />
                        </div>
                    </Grid>
                </Grid>

                <hr className='hrku1' />
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 12, xs: 12 }}>
                        <div className='chartContainer shaddow1' style={{ paddingBottom: 30 }}>
                            <div className='dashboardTitle'>Time Series</div>
                            <LineChartx />
                        </div>
                    </Grid>

                </Grid>

                <hr className='hrku1' />
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='dashboardContainer shaddow1'>
                            <div className='dashboardTitle'>New Data</div>
                            <ListData />
                            <ListData />
                            <ListData />
                            <ListData />
                            <ListData />
                            <ListData />
                        </div>
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='dashboardContainer shaddow1'>
                            <div className='dashboardTitle'>Our Process</div>
                            <Stepperx />
                        </div>
                    </Grid>
                </Grid>

                <hr className='hrku1' />
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='dashboardContainer shaddow1'>
                            <div className='dashboardTitle'>New Video</div>
                            <ListImage />
                        </div>
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <div className='dashboardContainer shaddow1'>
                            <div className='dashboardTitle'>New Picture</div>
                            <ListImage />
                        </div>
                    </Grid>
                </Grid>


            </div>
        </div>
    )
}

export default Template1