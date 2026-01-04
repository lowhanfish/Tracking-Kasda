import React, { useState, useEffect } from 'react'

import { Fieldx, Autocompletex, Popperx } from '@assets/styling/style'
import { TextField } from "@mui/material";
import { GetBIODATA } from "@lib/dataFetch.js";
import useStorex from '@store/index';



const BiodataAutoComplete = ({ selectedBiodata, setSelectedBiodata, selectedUnitKerjaForm }: any) => {

    const [APIBiodata, setAPIBiodata] = useState([]);
    const [inputValueBiodata, setInputValueBiodata] = useState('');

    const profile = JSON.parse(localStorage.getItem('profile'));

    const { url } = useStorex()
    const token = localStorage.getItem("authToken");

    const handleDataBiodata = async (data) => {
        const datax = {
            nama: data,
            sub_unit_kerja: selectedUnitKerjaForm ? selectedUnitKerjaForm.id : profile.profile.sub_unit_kerja_id,
        }
        const newAPIBiodata = await GetBIODATA(datax, token, url);
        console.log(newAPIBiodata)
        setAPIBiodata(newAPIBiodata);
    };

    useEffect(() => {
        handleDataBiodata('');
    }, [selectedBiodata, selectedUnitKerjaForm])

    useEffect(() => {
        if (selectedBiodata?.nama) {
            setInputValueBiodata(selectedBiodata.nama);
        }
    }, [selectedBiodata]);

    return (
        <>
            <Autocompletex
                value={selectedBiodata || null}
                onChange={(event, newValue) => {
                    setSelectedBiodata(newValue);
                    setInputValueBiodata(newValue?.nama || '');
                }}
                inputValue={inputValueBiodata}
                onInputChange={(event, newInputValue) => {
                    setInputValueBiodata(newInputValue);
                    handleDataBiodata(newInputValue);
                }}
                size="small"
                options={APIBiodata}
                getOptionLabel={(option: { nama: string }) => option.nama || ""}
                PopperComponent={Popperx}
                renderInput={(params) => <TextField {...params} />}
                renderOption={(props, option: { id: string, nama: string, nip: string }) => (
                    <li {...props} key={option.id}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                                {option.nama}
                            </span>
                            <span style={{ fontSize: "10px", color: "#666" }}>
                                NIP. {option.nip}
                            </span>
                        </div>
                    </li>
                )}
            />

        </>
    )
}

export default BiodataAutoComplete
