import * as React from 'react';






import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";

import { Clear, Add } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';


import Photo from '@assets/img/Photo.png';


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
                                <div className='TextProfileLeftVal'>Kiken S batara</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Company</div>
                                <div className='TextProfileLeftVal'>
                                    Department of Communication, Informatics, and Encryption of South Konawe Regency
                                </div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Job title</div>
                                <div className='TextProfileLeftVal'>
                                    Head of Application, Information Technology, and Communication Division
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
                                <div className='TextProfileLeftVal'>+62 82349018600</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>email</div>
                                <div className='TextProfileLeftVal'>kikensbatara@gmail.com</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Address</div>
                                <div className='TextProfileLeftVal'>Jl. Beringin No.31
                                    Kel. Bende Kec. Kadia
                                    Kota Kendari - Sulawesi Tenggara</div>
                            </div>

                        </Grid>


                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Education</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Bachelor's Degree</div>
                                <div className='TextProfileLeftVal'>Information Systems - STMIK Bina Bangsa Kendari (2004 – 2009)</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Master's Degree</div>
                                <div className='TextProfileLeftVal'>Electrical Engineering - Universitas Islam Sultan Agung (2011 – 2014)</div>
                            </div>

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
                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Product Development</div>
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

export default Template1