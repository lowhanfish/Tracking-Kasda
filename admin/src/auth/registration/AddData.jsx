import { useState } from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Clear, Add, Search } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import BasicSelect from '@components/items/BasicSelect';



const AddData = ({ handleCloseModalAdd, }) => {


    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                <div className='headerModal'>
                    <div className='headerModalLeft'>Add User</div>
                    <div className='headerModalRight'>
                        <IconButton onClick={handleCloseModalAdd} aria-label="fingerprint">
                            <Clear />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component="div">

                    <FieldSingle Title={'Name'} />
                    <FieldSingle Title={'Address'} />
                    <FieldSingle Title={'Email'} />
                    <FieldSingle Title={'Phone Number'} />
                    <BasicSelect Title={'Level Access'} />
                    <FieldSingle Title={'Username'} />
                    <FieldSingle Title={'Password'} />
                    <FieldSingle Title={'Confirm Password'} />

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseModalAdd}>
                    Cancel
                </Button>
                <Button onClick={handleCloseModalAdd} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </>
    )



}





export default AddData