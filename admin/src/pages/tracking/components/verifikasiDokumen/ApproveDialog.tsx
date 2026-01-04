import React, { useState, useEffect } from 'react';
import { Button, Dialog, Grid, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


import Clear from '@mui/icons-material/Clear';
import FieldSingle from '@components/items/FieldSingle.jsx';
import LexicalEditor from '@components/items/QuillEditor';
import Loadingr from '@components/Loading';


function ApproveDialog({ open, onClose, fullScreen, maxWidth, title, onSave, value, onChange, approvePath, loadingForm }: any) {
    // fullScreen => Dialog.fullScreen (boolean)

    const [file, setFile] = useState(null);

    const handleFileUpload = (event: any) => {
        const files = event.target.files;
        if (files) {
            setFile(Array.from(files));
        }
    }

    const removeFile = (index: number) => {
        setFile(prev => {
            if (Array.isArray(prev)) {
                return prev.filter((_, i) => i !== index);
            }
            return null;
        });
    }


    return (
        <Dialog disableAutoFocus disableEnforceFocus fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='TextProfileHead shaddowText'>{title} Data</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={onClose} aria-label="close">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                {/* Gunakan value dan onChange yang dipassing dari parent */}

                {
                    loadingForm ? (
                        <div style={{ paddingBottom: 20 }}>
                            <Loadingr text='Mengirim Data...' />
                        </div>

                    ) : (

                        <Grid container spacing={1}>
                            <Grid size={{ md: 12, xl: 12 }}>
                                <LexicalEditor
                                    label={approvePath === `approve` ? 'Catatan / Keterangan Approve' : 'Catatan / Keterangan Reject'}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Tulis alasan atau catatan verifikasi di sini..."
                                />
                            </Grid>


                            <Grid size={{ md: 12, xs: 12 }} sx={{ marginTop: -3 }}>
                                <FieldSingle
                                    Title='Pilih Lampiran Jika ada'
                                    type='file'
                                    name='file'
                                    accept='.pdf,image/*'
                                    multiple
                                    onChange={handleFileUpload}
                                />
                            </Grid>

                            {
                                file && Array.isArray(file) && file.length > 0 && (
                                    <Grid size={{ md: 12, xs: 12 }} container spacing={1} style={{ marginTop: 10 }}>
                                        <Grid size={{ md: 12, xs: 12 }}>
                                            <div className="table-wrap" style={{ width: '100%' }}>
                                                <table className="tabelku shaddow2" style={{ width: '100%' }}>
                                                    <thead className="h_thead shaddowText">
                                                        <tr>
                                                            <th style={{ width: '5%' }} scope="col">No</th>
                                                            <th style={{ width: '90%' }} scope="col">Nama File</th>
                                                            <th style={{ width: '5%' }} scope="col">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="h_body">
                                                        {
                                                            file.map((f: any, index: number) => (
                                                                <tr key={index}>
                                                                    <td className='center'>{index + 1}.</td>
                                                                    <td>{f.name}</td>
                                                                    <td>
                                                                        <button
                                                                            className='btn sm danger shaddow1'
                                                                            onClick={() => removeFile(index)}
                                                                        >
                                                                            <CloseIcon sx={{ fontSize: 18 }} />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            }

                        </Grid>
                    )
                }



            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>

                <Button disabled={loadingForm} variant="contained" color={approvePath === `approve` ? `success` : `error`} onClick={() => onSave(file)}>
                    Save &
                    {approvePath === `approve` ? ' Approve' : ' Reject'}
                </Button>

            </DialogActions>
        </Dialog>
    );
}
export default ApproveDialog
