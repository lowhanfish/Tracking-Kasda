import { useState } from 'react'

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Settings } from '@mui/icons-material';

function Anchorx({ index }) {
    // ====== ANCHOR ====== 
    const [anchorEl, setAnchorEl] = useState(null);
    const [openIndex, setOpenAnchorIndex] = useState(null);

    const handleClickAnchor = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpenAnchorIndex(index);
    };

    const handleCloseAnchor = () => {
        setAnchorEl(null);
        setOpenAnchorIndex(null);
    };
    // ====== ANCHOR ====== 
    return (
        <div className='settingContainer'>
            <button
                className="btn rad primarySoft sm"
                onClick={(e) => handleClickAnchor(e, index)}
            >
                <Settings sx={{ fontSize: 14 }} />
            </button>

            <Menu
                keepMounted
                id={`menu-${index}`}
                anchorEl={openIndex === index ? anchorEl : null}
                open={openIndex === index}
                onClose={handleCloseAnchor}
                slotProps={{
                    list: {
                        'aria-labelledby': `basic-button-${index}`,
                    },
                }}
            >
                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Detail</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Edit</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} onClick={handleCloseAnchor}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default Anchorx
