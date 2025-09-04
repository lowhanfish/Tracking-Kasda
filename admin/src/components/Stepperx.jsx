import React from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Paper } from '@mui/material';

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
      you're willing to spend on clicks and conversions, which networks
      and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
      and learn how to enhance your ads using features like ad extensions.
      If you run into any problems with your ads, find out how to tell if
      they're running and how to resolve approval issues.`,
    },
];

const StaticStepper = () => {
    return (
        <>

            <div style={{ paddingLeft: 40, paddingRight: 5, height: 389, overflowY: 'auto' }}>
                <Stepper activeStep={steps.length} orientation="vertical">

                    <Step completed={true}>
                        <StepLabel>
                            <div className='StepLabel1'>Verifikasi Dokumen</div>
                            <div className='StepLabel2'>bbbb</div>
                        </StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>
                            <div className='StepLabel1'> Verifikasi dan Penerbitan SPM</div>
                            <div className='StepLabel2'>Kiken S Batara (4 Sep 2025 - 09:00 WITA)</div>
                        </StepLabel>

                    </Step>
                    <Step completed={true}>
                        <StepLabel>
                            <div className='StepLabel1'>Verifikasi Kelengkapan dan Keabsahan Berkas</div>
                            <div className='StepLabel2'>Kiken S Batara (4 Sep 2025 - 09:20 WITA)</div>
                        </StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>
                            <div className='StepLabel1'>Penerbitan Surat Perintah Pencairan Dana (SP2D)</div>
                            <div className='StepLabel2'>Kiken S Batara (4 Sep 2025 - 09:30 WITA)</div>
                        </StepLabel>

                    </Step>
                    <Step completed={false}>
                        <StepLabel>
                            <div className='StepLabel1'>Proses Bank</div>

                        </StepLabel>
                    </Step>


                </Stepper>

            </div>


        </>

    );
};

export default StaticStepper;
