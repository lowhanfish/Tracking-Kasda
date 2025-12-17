import { useState, useEffect } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import Clear from '@mui/icons-material/Clear';
import Stepperx from '@components/Stepperx';
import formatRupiah from '@lib/format';
import { formatDate } from '@lib/index';

import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileData from './FileData';





type IconxProps = {
    statusx: number
}

const Iconx = ({ statusx }: IconxProps) => {
    if (statusx == 0) {
        return (
            <HourglassTopIcon sx={{ backgroundColor: '#ff9800', color: 'white', width: 26, height: 26, padding: 0.5, fontSize: 26, borderRadius: 50 }} />
        )
    } else if (statusx == 1) {
        return (
            <CheckIcon sx={{ backgroundColor: '#357a38', color: 'white', width: 26, height: 26, padding: 0.5, fontSize: 26, borderRadius: 50 }} />
        )
    } else {
        return (
            <ErrorOutlineIcon sx={{ backgroundColor: '#b22a00', color: 'white', width: 26, height: 26, padding: 0.5, fontSize: 26, borderRadius: 50 }} />
        )
    }
}

function DetailData({ open, onClose, fullScreen, maxWidth, title, formData, ppn, pph, tracking }: any) {
    // fullScreen => Dialog.fullScreen (boolean)
    // fullWidth is always helpful for our layout, so pass it as true


    const [openModal, setOpenModal] = useState(false);
    const [fullScreen1, setFullScreen1] = useState(false);
    const openModalFunc = () => setOpenModal(true);
    const closeModalFunc = () => setOpenModal(false);


    return (
        <Dialog disableAutoFocus disableEnforceFocus fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    {/* <div className='headerModalLeft'>{title}</div> */}
                    <div className='TextProfileHead shaddowText'>{title}</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={onClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">
                    <hr className='hrku2' />
                    <div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Unit Kerja</div>
                            <div className='TextProfileLeftVal'>{formData.sub_unit_kerja_uraian || ""}</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Nama Kegiatan</div>
                            <div className='TextProfileLeftVal'>
                                <div className=''>{formData.uraian ?? ""}</div>
                                <div>
                                    ({formData.uraian_jns_pencairan ?? ""})
                                </div>
                            </div>

                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Tanggal Pengajuan</div>
                            <div className='TextProfileLeftVal'>Tanggal {formatDate(formData.createdAt)}</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Pagu Anggaran</div>
                            <div className='TextProfileLeftVal'>{formatRupiah(formData.nilai ?? 0)}</div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>PPN</div>
                            <div className='TextProfileLeftVal'>
                                {
                                    ppn.map((data, index) => (
                                        <div key={index}>{data.label} - {data.nilai}%</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>PPH</div>
                            <div className='TextProfileLeftVal'>
                                {
                                    pph.map((data, index) => (
                                        <div key={index}>{data.label} - {data.nilai}%</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Total Pencairan</div>
                            <div className='TextProfileLeftVal'>
                                Rp.{formData.nilai || 0}
                            </div>
                        </div>
                        <div className='TextProfileLeftContainer'>
                            <div className='TextProfileLeftTitle'>Di Ajukan Oleh</div>
                            <div className='TextProfileLeftVal'>{formData.nama_pengusul ?? ""}</div>
                        </div>

                        <hr className='hrku2' />

                        <div className='fileContainer TextProfileLeftContainer' >

                            <div style={{ cursor: 'pointer' }} onClick={(e) => { e.currentTarget.blur(); openModalFunc() }} >
                                <PictureAsPdfIcon sx={{ fontSize: 35 }} />
                            </div>
                            <div style={{ cursor: 'pointer' }}>
                                <PictureAsPdfIcon sx={{ fontSize: 35 }} />
                            </div>
                            <div style={{ cursor: 'pointer' }}>
                                <PictureAsPdfIcon sx={{ fontSize: 35 }} />
                            </div>
                        </div>

                        <hr className='hrku2' />

                        <div style={{ marginTop: 20 }} className='dashboardContainer'>
                            <div className='dashboardTitle'>Progres Kegiatan Terahir</div>
                            {/* <Stepperx /> */}
                            <div style={{ paddingLeft: 40, paddingRight: 5, }}>
                                <Stepper orientation="vertical">
                                    {
                                        tracking.map((data, index) => (
                                            <Step key={index}>
                                                <StepLabel icon={<Iconx statusx={data.status} />}>
                                                    <div className='StepLabel1'>{data.master_tahapan_uraian}</div>
                                                    <div className='StepLabel2'>{data.nama_pengusul}</div>
                                                    <div className='StepLabel2'>{`(${data.createdAt || "-:-:-"})`}</div>
                                                </StepLabel>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                            </div>
                        </div>

                        <hr className='hrku2' />




                        <FileData
                            open={openModal}
                            onClose={closeModalFunc}
                            title="Detail File"
                            fullScreen={fullScreen1}
                            maxWidth="md"

                        />





                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DetailData