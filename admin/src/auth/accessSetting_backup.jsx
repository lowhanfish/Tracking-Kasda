
import { useState, Fragment } from "react";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';

import { Clear, Add, Settings, ArrowDropDown } from '@mui/icons-material';
import FieldSingle from '@components/items/FieldSingle';
import FieldWithButton from '@components/items/FieldWithButton';
import FieldAutocomplete from '@components/items/FieldAutocomplete';
import Anchorx from '@components/items/Anchorx';
import FieldDatex from '@components/items/FieldDatex';
import BasicSelect from '@components/items/BasicSelect';



function AccessSetting() {


    // ====== TOGLE SHOW/HIDE ====== 
    const [openParent, setOpenParent] = useState(null);
    const [openChild, setOpenChild] = useState(null);
    // ====== TOGLE SHOW/HIDE ====== 



    // ====== MODAL ADD ====== 
    const [openModalAdd, setOpenModal] = useState(false);
    // const theme = useTheme();
    const [fullScreen, setFullScreen] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const handleClickopenModalAdd = () => {
        setOpenModal(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModal(false);
    };
    // ====== MODAL ADD ====== 


    return (
        <div className="cardx">
            <div className="cardxHeader">
                <Grid container spacing={1}>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <FieldWithButton placeholderx={'Cari Data..'} />
                    </Grid>

                </Grid>
            </div>
            <div className="cardxBody">


                {/* <Button className='btnAdd' variant="contained" size="small">Small</Button> */}
                <div className='btnContainer'>
                    <button onClick={handleClickopenModalAdd} className='btn md primarySoft shaddow1 width150'>
                        <Add sx={{ fontSize: 18 }} />
                        Add Data
                    </button>
                    {/* <button className='btn danger shaddow1'>Add Data</button> <br /> <br />
                    <button className='btn lg warning fullWidth shaddow2'>Add Data</button> */}
                </div>

                <div className="table-wrap" tabIndex="0">
                    <table className="tabelku shaddow2" style={{ width: '100%' }}>
                        <thead className="h_thead shaddowText">
                            <tr>
                                <th style={{ width: '5%' }} scope="col">#</th>
                                <th style={{ width: '5%' }} scope="col">Set</th>
                                <th style={{ width: '5%' }} scope="col">No</th>
                                <th style={{ width: '20%' }} scope="col">Icon</th>
                                <th style={{ width: '25%' }} scope="col">Name</th>
                                <th style={{ width: '20%' }} scope="col">Route</th>
                                <th style={{ width: '30%' }} scope="col">Type</th>
                            </tr>
                        </thead>
                        <tbody className="h_body">

                            {[...Array(5)].map((_, index) => (
                                <Fragment key={index}>
                                    {/* Row 1 (Parent) */}
                                    <tr className="rw1">
                                        <td>
                                            <button
                                                className="btn rad rw1Revert sm"
                                                onClick={() => setOpenParent(openParent === index ? null : index)}
                                            >
                                                {openParent === index
                                                    ? <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(180deg)", transition: "0.2s" }} />
                                                    : <ArrowDropDown sx={{ fontSize: 14, transform: "rotate(0deg)", transition: "0.2s" }} />
                                                }
                                            </button>
                                        </td>
                                        <td className="center">
                                            <Anchorx />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>Data parent</td>
                                        <td>Data parent</td>
                                        <td>Data parent</td>
                                        <td>Data parent</td>
                                    </tr>

                                    {/* Row 2 (Child dari Parent) */}
                                    {openParent === index && (
                                        <tr className="rw2">
                                            <td>
                                                <button
                                                    className="btn rad rw1Revert sm"
                                                    onClick={() =>
                                                        setOpenChild(openChild === index ? null : index)
                                                    }
                                                >
                                                    {openChild === index ? (
                                                        <ArrowDropDown
                                                            sx={{ fontSize: 14, transform: "rotate(180deg)", transition: "0.2s" }}
                                                        />
                                                    ) : (
                                                        <ArrowDropDown
                                                            sx={{ fontSize: 14, transform: "rotate(0deg)", transition: "0.2s" }}
                                                        />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="center">
                                                <Anchorx />
                                            </td>
                                            <td>xx</td>
                                            <td>Data child</td>
                                            <td>Data child</td>
                                            <td>Data child</td>
                                            <td>Data child</td>
                                        </tr>
                                    )}

                                    {/* Row 3 (Nested dari Row 2) */}
                                    {openParent === index && openChild === index && (
                                        <tr>
                                            <td></td>
                                            <td className="center">
                                                <Anchorx />
                                            </td>
                                            <td>xx</td>
                                            <td>xx</td>
                                            <td>xx</td>
                                            <td>xx</td>
                                            <td>xx</td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}


                        </tbody>
                    </table>
                </div>





                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={maxWidth}
                    open={openModalAdd}
                    onClose={handleCloseModalAdd}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <div className='headerModal'>
                            <div className='headerModalLeft'>Add Data</div>
                            <div className='headerModalRight'>
                                <IconButton onClick={handleCloseModalAdd} aria-label="fingerprint">
                                    <Clear />
                                </IconButton>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText component="div">

                            <FieldSingle Title={'FieldSingle'} />
                            <FieldSingle Title={'FieldSingle'} />
                            <FieldSingle Title={'FieldSingle'} />
                            <FieldWithButton Title={'FieldWithButton'} />

                            <Grid container spacing={1}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <FieldAutocomplete Title={'FieldAutocomplete'} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <FieldDatex Title={'FieldDatex'} />
                                </Grid>
                            </Grid>


                            <BasicSelect Title={'BasicSelect'} />




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
                </Dialog>




            </div>
        </div>
    )
}

export default AccessSetting
