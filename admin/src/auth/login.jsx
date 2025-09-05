import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Logox from '@assets/img/logox.png';
import useStorex from "@store";

import axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    const { url } = useStorex();

    const [errorStatus, setErrorStatus] = useState(false);
    const [loadingx, setLoadingx] = useState(false);

    const [errorAlert, SetErrorAlert] = useState('');
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const handleLogin = () => {
        navigate("/Dashboard"); // arahkan ke Dashboard setelah login
    };

    const handleForm = (field) => (e) => {
        setForm({
            ...form,
            [field]: e.target.value
        });
    };


    //  value={form.password}

    const login = () => {
        setLoadingx(true)
        axios.post(url.URL_LOGIN, {
            username: form.username,
            password: form.password
        }).then((response) => {
            // console.log("sukses")
            setLoadingx(false)
            console.log(response.data)

            const token = response.data.token;
            const profile = JSON.stringify(response.data.profile);

            if (token) {
                // 1. Simpan token ke localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('profile', profile);

                // 2. Arahkan pengguna ke halaman Dashboard
                navigate("/Dashboard");
            } else {
                // Handle jika token tidak ditemukan
                console.error("Token tidak ditemukan dalam respons.");
                setErrorStatus(true);
                SetErrorAlert("Login berhasil, tapi token tidak ditemukan.");
            }
        }).catch((err) => {
            // console.log("error")
            setLoadingx(false)
            setErrorStatus(true)
            SetErrorAlert(err.response.data)
            // console.log(err.response.data)
        })
    }

    useEffect(() => {

    }, [])



    return (
        <div className="singlePage">
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100%' }}>
                <Paper sx={{ p: 4, width: 300, backgroundColor: 'rgba(255, 255, 255, 0.23)' }}>

                    <Typography variant="h6" mb={2}>Login</Typography>
                    {/* <h1>{url.URL_LOGIN}</h1> */}
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

                    {
                        errorStatus && (

                            <Alert variant="filled" severity="error">
                                {errorAlert}.!!!
                            </Alert>

                        )
                    }
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
                        <TextField onClick={() => setErrorStatus(false)} value={form.username} onChange={handleForm('username')} label="Email" fullWidth />
                        <TextField onClick={() => setErrorStatus(false)} value={form.password} onChange={handleForm('password')} label="Password" type="password" fullWidth />




                        <Button
                            {...(loadingx && { loading: true })}
                            sx={{ backgroundColor: 'rgba(7, 123, 211, 0.34)' }}
                            onClick={login}
                            variant="contained">
                            Login
                        </Button>
                    </Box>
                </Paper>

            </div>

        </div>
    );
}
