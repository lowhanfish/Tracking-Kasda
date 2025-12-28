import React from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Paper } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';



// Component untuk menampilkan icon status (pending, success, error)
const Iconx = ({ statusx }) => {
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

const StaticStepper = ({ progress }) => {
    return (
        <>

            <div>
                <Stepper orientation="vertical">
                    {
                        progress.map((data, index) => (
                            <Step key={index} completed={true} sx={{ cursor: 'pointer' }}>
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


        </>

    );
};

export default StaticStepper;
