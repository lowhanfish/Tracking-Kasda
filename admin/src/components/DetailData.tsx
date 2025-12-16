import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import Clear from '@mui/icons-material/Clear';
import Stepperx from '@components/Stepperx';
import formatRupiah from '@lib/format';

import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';

type IconxProps = {
    statusx: number
}

const Iconx = ({ statusx }: IconxProps) => {

    if (statusx == 0) {
        return (
            <ErrorIcon sx={{ backgroundColor: '#ff9800', color: 'white', height: 20, width: 20, fontSize: 26 }} />
        )
    } else if (statusx == 1) {
        return (
            <ErrorIcon sx={{ backgroundColor: '#357a38', color: 'white', height: 20, width: 20, fontSize: 26 }} />
        )
    } else {
        return (
            <ErrorIcon sx={{ backgroundColor: '#b22a00', color: 'white', height: 20, width: 20, fontSize: 26 }} />
        )
    }


}




function DetailData({ open, onClose, fullScreen, maxWidth, title, formData, ppn, pph }: any) {
    // fullScreen => Dialog.fullScreen (boolean)
    // fullWidth is always helpful for our layout, so pass it as true
    return (
        <Dialog fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
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
                            <div className='TextProfileLeftVal'>Tanggal {formData.createdAt}</div>
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
                            <div className='TextProfileLeftVal'>xxxxx</div>
                        </div>


                        <div style={{ marginTop: 20 }} className='dashboardContainer'>
                            <div className='dashboardTitle'>Progres Kegiatan Terahir</div>
                            {/* <Stepperx /> */}


                            <div style={{ paddingLeft: 40, paddingRight: 5, height: 389, overflowY: 'auto' }}>

                                <Stepper orientation="vertical">

                                    <Step>
                                        <StepLabel icon={<CheckIcon sx={{ backgroundColor: '#ff9800', color: 'white', borderRadius: 50, fontSize: 26 }} />}>
                                            <div className='StepLabel1'>Penerbitan Surat Perintah Pencairan Dana (SP2D)</div>
                                            <div className='StepLabel2'>Kiken S Batara (4 Sep 2025 - 09:30 WITA)</div>
                                        </StepLabel>
                                    </Step>



                                </Stepper>

                            </div>






                        </div>


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
