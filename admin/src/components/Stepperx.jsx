import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';

const DetailTracking = ({ open, handleClose, title, listHistory }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <div className='headerModal'>
                    <div className='TextProfileHead shaddowText'>{title}</div>
                    <div className='headerModalRight'>
                        {/* Tombol untuk menutup modal */}
                        <IconButton onClick={handleClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <div />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};



// Component untuk menampilkan icon status (pending, success, error)
const Iconx = ({ statusx }) => {
    if (statusx == 0) {
        return (
            <HourglassTopIcon sx={{ backgroundColor: '#ff9800', color: 'white', width: 26, height: 26, padding: 0.5, fontSize: 26, borderRadius: 50 }} />
        );
    } else if (statusx == 1) {
        return (
            <CheckIcon sx={{ backgroundColor: '#357a38', color: 'white', width: 26, height: 26, padding: 0.5, fontSize: 26, borderRadius: 50 }} />
        );
    } else {
        return (
            <ErrorOutlineIcon sx={{ backgroundColor: '#b22a00', color: 'white', width: 26, height: 26, padding: 0.5, fontSize: 26, borderRadius: 50 }} />
        );
    }
};

const StaticStepper = ({ progress = [] }) => {

    const [titleDetailTracking, setTitleDetailTracking] = useState("");
    const [listHistory, setListHistory] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);

    const handleOpen = (item) => {
        setSelected(item);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelected(null);
    };

    return (
        <>
            <div>
                <Stepper orientation="vertical">
                    {progress.map((data, index) => (
                        <Step key={index} completed={true}>
                            <StepLabel
                                icon={<Iconx statusx={data.status} />}
                                sx={{
                                    cursor: 'pointer',
                                    // ensure the label content (multiple lines) is centered vertically
                                    '& .MuiStepLabel-label': {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }
                                }}
                                onClick={() => { setTitleDetailTracking(data.master_tahapan_uraian); handleOpen(data); }}
                            >
                                <div className='StepLabel1'>{data.master_tahapan_uraian}</div>
                                <div className='StepLabel2'>{data.nama_pengusul}</div>
                                <div className='StepLabel2'>{`(${data.createdAt || "-:-:-"})`}</div>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>


            <DetailTracking
                open={open}
                handleClose={handleClose}
                title={titleDetailTracking}
            />


        </>
    );
};

export default StaticStepper;
