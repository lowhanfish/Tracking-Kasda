import React from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Logox from '@assets/img/logox.png';
import useStorex from "../store";


export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // nanti bisa ditambah validasi login di sini
        navigate("/Dashboard"); // arahkan ke Dashboard setelah login
    };



    return (
        <div className="singlePage">
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100%' }}>
                <Paper sx={{ p: 4, width: 300, backgroundColor: 'rgba(255, 255, 255, 0.23)' }}>

                    <Typography variant="h6" mb={2}>Login</Typography>
                    <img
                        src={Logox}
                        alt="No image"
                        style={{
                            width: '100%',
                            height: "auto",
                            display: "block",
                            opacity: '0.95'
                        }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
                        <TextField label="Email" fullWidth />
                        <TextField label="Password" type="password" fullWidth />
                        <Button sx={{ backgroundColor: 'rgba(7, 123, 211, 0.34)' }} onClick={handleLogin} variant="contained">Login</Button>
                    </Box>
                </Paper>

            </div>

        </div>
    );
}
