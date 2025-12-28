import { useState, useEffect } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import Clear from '@mui/icons-material/Clear';
import formatRupiah from '@lib/format';
import { formatDate } from '@lib/index';

import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileData from './FileData';

import axios from 'axios';
import useStorex from '@store/index';
import Stepperx from '../components/Stepperx';


type IconxProps = {
    statusx: number
}

// Component untuk menampilkan icon status (pending, success, error)
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

function DetailData({ open, onClose, fullScreen, maxWidth, title, formData }: any) {


    const { url } = useStorex();
    const token = localStorage.getItem("authToken");


    // State untuk file yang akan ditampilkan di modal FileData
    const [file, setFile] = useState(null);
    const [ppn, setPpn] = useState([]);
    const [pph, setPph] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [tracking, setTracking] = useState([]);

    // State untuk modal FileData
    const [openModal, setOpenModal] = useState(false);
    const [fullScreen1, setFullScreen1] = useState(false);

    // Buka modal FileData dengan file yang dipilih
    const openModalFunc = (data) => {
        setFile(data);
        setOpenModal(true);
    };

    // Tutup modal FileData
    const closeModalFunc = () => setOpenModal(false);

    const viewOne = () => {
        axios.post(url.URL_DOCUMENT + "/viewOne", JSON.stringify({ id: formData.id }), {
            headers: {
                'Authorization': `kikensbatara ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(result => {
            console.log(result.data[0]);
            const finalResult = result.data[0];
            setPpn(finalResult.ppn);
            setPph(finalResult.pph);
            setListFiles(finalResult.files);
            setTracking(finalResult.tracking);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (open) {
            viewOne();
        }
    }, [open])

    return (
        <Dialog disableAutoFocus disableEnforceFocus fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='TextProfileHead shaddowText'>{title}</div>
                    <div className='headerModalRight'>
                        {/* Tombol untuk menutup modal */}
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

                        {/* Daftar file lampiran yang dapat diklik untuk membuka FileData modal */}
                        <div className='fileContainer TextProfileLeftContainer' >

                            {
                                listFiles.map((data, index) => (
                                    <div key={index} style={{ cursor: 'pointer' }} onClick={(e) => { e.currentTarget.blur(); openModalFunc(data) }} >
                                        <PictureAsPdfIcon sx={{ fontSize: 35 }} />
                                    </div>

                                ))
                            }
                        </div>

                        <hr className='hrku2' />

                        {/* Stepper untuk menampilkan progres kegiatan */}
                        <div style={{ marginTop: 20 }} className='dashboardContainer'>
                            <div className='dashboardTitle'>Progres Kegiatan Terahir</div>
                            <div style={{ paddingLeft: 40, paddingRight: 5, }}>

                                <Stepperx
                                    progress={tracking}
                                />
                                {/* <Stepper orientation="vertical">
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
                                </Stepper> */}
                            </div>
                        </div>

                        <hr className='hrku2' />

                        <FileData
                            open={openModal}
                            onClose={closeModalFunc}
                            title="Detail File"
                            fullScreen={fullScreen1}
                            maxWidth="md"
                            file={file}
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