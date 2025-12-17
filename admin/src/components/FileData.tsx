import React, { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import Clear from '@mui/icons-material/Clear';


const FileData = ({ open, onClose, fullScreen, maxWidth, title, children, onSave }: any) => {



    useEffect(() => {
        if (open) {
            // Blur any focused element when dialog opens
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
                {/* <DialogContentText component="div"> */}
                <div style={{ height: '100%', width: '100%', flex: 1 }}>
                    <object data="https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf" type="application/pdf" width="100%" height="100%">
                        <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                    </object>
                </div>
                {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FileData
