import React, { useState, useEffect } from 'react'

import { Fieldx, Autocompletex, Popperx } from '@assets/styling/style'
import { TextField } from "@mui/material";
import { GetUnitKerja } from "@lib/dataFetch.js";
import useStorex from '@store/index';



const UnitKerjaAutoComplete = ({ selectedUnitKerja, setSelectedUnitKerja, objectData = false }: any) => {

    const [APIUnitKerja, setAPIUnitKerja] = useState([]);
    const [inputValueUnitKerja, setInputValueUnitKerja] = useState('');

    const { url } = useStorex()
    const token = localStorage.getItem("authToken");

    const handleDataUnitKerja = async (data) => {
        const newAPIUnitKerja = await GetUnitKerja(data, token, url);
        setAPIUnitKerja(newAPIUnitKerja);
    };

    useEffect(() => {
        handleDataUnitKerja("");
    }, [selectedUnitKerja])

    // Sinkronkan inputValue dengan selectedUnitKerja saat dipilih
    useEffect(() => {
        if (selectedUnitKerja?.unit_kerja) {
            setInputValueUnitKerja(selectedUnitKerja.unit_kerja);
        }
    }, [selectedUnitKerja]);

    return (
        <>
            <Autocompletex
                value={selectedUnitKerja || null}
                onChange={(event, newValue) => {
                    setSelectedUnitKerja(newValue);
                    setInputValueUnitKerja(newValue?.unit_kerja || '');
                }}
                inputValue={inputValueUnitKerja}
                onInputChange={(event, newInputValue) => {
                    setInputValueUnitKerja(newInputValue);
                    handleDataUnitKerja(newInputValue);
                }}
                size="small"
                options={APIUnitKerja}
                getOptionLabel={(option: { unit_kerja: string }) => option.unit_kerja || ""}
                PopperComponent={Popperx}
                renderInput={(params) => <TextField {...params} />}
                renderOption={(props, option: { id: string, unit_kerja: string, uraian_instansi: string }) => (
                    <li {...props} key={option.id}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                                {option.unit_kerja}
                            </span>
                            <span style={{ fontSize: "10px", color: "#666" }}>
                                {option.uraian_instansi}
                            </span>
                        </div>
                    </li>
                )}
            />

        </>
    )
}

export default BiodataAutoComplete
