import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import { getPOST } from "@lib/dataFetch";
import useStorex from '@store/index';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileData from './FileData';

const DetailTracking = ({ open, handleClose, title, listHistory, data }) => {

    const [file, setFile] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [fullScreen1, setFullScreen1] = useState(false);

    // Buka modal FileData dengan file yang dipilih
    const openModalFunc = (data) => {
        setFile(data);
        setOpenModal(true);
    };

    const closeModalFunc = () => setOpenModal(false);






    console.log(data);
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <div className='headerModal'>
                    <div className='TextProfileHead shaddowText'>{title}</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={handleClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>



                    {

                        data.map((data, index) => (

                            <div key={index} className='list_history'>
                                <div className='StepLabel1' dangerouslySetInnerHTML={{ __html: data.keterangan }} />
                                <div className='StepLabel2 list_history_file'>asdasdasdasdas</div>
                                <div className='StepLabel2'>{`(${data.createdAt || "-:-:-"})`}</div>

                                {
                                    data.files.length > 0 && (



                                        <div className='list_history_file'>

                                            {
                                                data.files.map((data1, index1) => (
                                                    <div key={index1} style={{ cursor: 'pointer' }} onClick={(e) => { e.currentTarget.blur(); openModalFunc(data1) }} >
                                                        <PictureAsPdfIcon sx={{ fontSize: 35 }} />
                                                    </div>

                                                ))

                                            }


                                        </div>

                                    )
                                }
                            </div>

                        ))

                    }




                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>


            <FileData
                open={openModal}
                onClose={closeModalFunc}
                title="Detail File"
                fullScreen={fullScreen1}
                maxWidth="md"
                file={file}
            />



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

    const token = localStorage.getItem('authToken');
    const { url } = useStorex();

    // console.log(progress)

    const [titleDetailTracking, setTitleDetailTracking] = useState("");
    const [listHistory, setListHistory] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);

    const handleOpen = async (item) => {
        if (item.status === 1 || item.status === 2) {
            setSelected(item);
            await loadData(item.documents_id, item.master_tahapan_id)
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
        // setSelected(null);
    };

    const loadData = async (id, master_tahapan_id) => {
        const data = await getPOST(token, url.URL_VERIFICATION + '/getHistory', {
            documents_id: id,
            master_tahapan_id: master_tahapan_id
        });
        console.log(data)

        setListHistory(Array.isArray(data) ? data : []);
    }

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
                data={listHistory}
            />



        </>
    );
};

export default StaticStepper;
