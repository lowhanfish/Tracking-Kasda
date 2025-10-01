import * as React from 'react';






import { Button, Dialog, Grid, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, IconButton } from "@mui/material";

import { Clear, Add } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';


import Photo from '@assets/img/Logo.png';


const Template2 = () => {




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

                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Color</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Template Colors</div>
                                <div className='DivProfileLeftVal TextProfileLeftVal'>
                                    <div className='DivProfileBoxColor'></div>
                                    <div className='DivProfileBoxColor'></div>
                                </div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Dashboard Colors</div>
                                <div className='DivProfileLeftVal TextProfileLeftVal'>
                                    <div className='DivProfileBoxColor'></div>
                                    <div className='DivProfileBoxColor'></div>
                                    <div className='DivProfileBoxColor'></div>
                                    <div className='DivProfileBoxColor'></div>
                                </div>
                            </div>
                        </Grid>

                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Image</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Icon</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>SideBar Image</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>Login Image</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div>

                        </Grid>
                        <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: 2 }}>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileHead shaddowText'>Link</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>YouTube URL</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div>
                            <div className='TextProfileLeftContainer'>
                                <div className='TextProfileLeftTitle'>File URL (PDF)</div>
                                <div className='TextProfileLeftVal'>yyyy</div>
                            </div>

                        </Grid>


                    </Grid>
                </div>


            </div>
        </div>
    )
}

export default Template2