import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type SnackBarProps = {
    active: boolean,
    message: string,
    color?: 'success' | 'error' | 'warning' | 'info',
}


const SnackBar = ({ active, message, color = 'info' }: SnackBarProps) => {

    return (
        <div>
            <Snackbar
                open={active}
                autoHideDuration={1000}
            >
                <Alert
                    severity={color}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>

            </Snackbar>
        </div>
    );

}

export default SnackBar
