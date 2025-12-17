import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import Clear from '@mui/icons-material/Clear';
import useStorex from '@store/index';



const FileData = ({ open, onClose, fullScreen, maxWidth, title, children, onSave, file }: any) => {

    const { url } = useStorex();
    const [filePath, setFilePath] = useState('');
    const [fileType, setFileType] = useState('');

    useEffect(() => {
        if (file && file.file) {
            setFilePath(url.URL_APP + "uploads/" + file.file);
            setFileType(file.type || 'application/pdf');
        }
    }, [file, url.URL_APP]);

    useEffect(() => {
        if (open) {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement) {
                activeElement.blur();
            }
        }
    }, [open]);

    return (
        <Dialog disableAutoFocus disableEnforceFocus fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title" sx={{ '& .MuiDialog-container': { height: '100vh' }, '& .MuiDialog-paper': { height: '100%', maxHeight: '100vh' } }}>
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
            <DialogContent style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', flex: 1 }}>
                <div style={{ height: '100%', width: '100%', flex: 1 }}>
                    {
                        filePath && (
                            fileType === "application/pdf" ? (
                                <object data={filePath} type="application/pdf" width="100%" height="100%">
                                    <p>Alternative text - include a link <a href={filePath}>to the PDF!</a></p>
                                </object>
                            ) : (
                                <img style={{ width: "100%", height: "auto" }} src={filePath} alt="" />
                            )
                        )
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FileData
