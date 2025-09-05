import React, { useState } from "react";
import { Button, TextField, Box, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Logox from '@assets/img/logox.png';
import useStorex from "@store";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const { url, login: setGlobalLogin } = useStorex();

    const [errorStatus, setErrorStatus] = useState(false);
    const [loadingx, setLoadingx] = useState(false);

    const [errorAlert, SetErrorAlert] = useState('');
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
        if (errorStatus) {
            setErrorStatus(false);
            SetErrorAlert('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoadingx(true);
        setErrorStatus(false);
        SetErrorAlert('');

        try {
            const response = await axios.post(url.URL_LOGIN, form);

            setLoadingx(false);

            const { token, profile } = response.data;

            if (token) {
                // Simpan token ke localStorage. Ini penting untuk persistensi
                // saat halaman di-reload.
                // Gunakan fungsi dari Zustand untuk memperbarui state global
                setGlobalLogin(token);
                localStorage.setItem('authToken', token);
                localStorage.setItem('profile', JSON.stringify(profile));
                navigate("/Dashboard");
            } else {
                setErrorStatus(true);
                SetErrorAlert("Login berhasil, tetapi token tidak ditemukan.");
            }
        } catch (err) {
            // setLoadingx(false);
            // setErrorStatus(true);
            // SetErrorAlert(err.response?.data?.message || 'Terjadi kesalahan jaringan.');
            // console.error(err);
            setLoadingx(false)
            setErrorStatus(true)
            SetErrorAlert(err.response.data)
        }
    };

    return (
        <div className="singlePage">
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100%' }}>
                <Paper sx={{ p: 4, width: 300, backgroundColor: 'rgba(255, 255, 255, 0.23)' }}>
                    <Typography variant="h6" mb={2}>Login</Typography>
                    <img src={Logox} alt="No image" style={{ width: '100%', height: "auto", display: "block", opacity: '0.95' }} />

                    {errorStatus && (
                        <Alert variant="filled" severity="error">
                            {errorAlert}.!!!
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
                        <TextField
                            name="username"
                            value={form.username}
                            onChange={handleForm}
                            label="Email"
                            fullWidth
                        />
                        <TextField
                            name="password"
                            value={form.password}
                            onChange={handleForm}
                            label="Password"
                            type="password"
                            fullWidth
                        />
                        <Button
                            {...(loadingx && { disabled: true })}
                            type="submit"
                            sx={{ backgroundColor: 'rgba(7, 123, 211, 0.34)' }}
                            variant="contained"
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </div>
        </div>
    );
}