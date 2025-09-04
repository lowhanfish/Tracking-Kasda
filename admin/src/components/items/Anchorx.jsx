import React from 'react'

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Settings } from '@mui/icons-material';

function Anchorx({ index }) {
    // ====== ANCHOR ====== 
    const [anchorEls, setAnchorEls] = React.useState({}); // key = index

    const handleClick = (event, index) => {
        setAnchorEls(prev => ({ ...prev, [index]: event.currentTarget }));
    };

    const handleClose = (index) => {
        setAnchorEls(prev => ({ ...prev, [index]: null }));
    };
    // ====== ANCHOR ====== 
    return (
        <div className='settingContainer'>
            <button
                className="btn rad primarySoft sm"
                onClick={(e) => handleClick(e, index)}
            >
                <Settings sx={{ fontSize: 14 }} />
            </button>

            <Menu
                id={`menu-${index}`}
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleClose(index)}
                slotProps={{
                    list: {
                        'aria-labelledby': `basic-button-${index}`,
                    },
                }}
            >
                <MenuItem sx={{ fontSize: 12 }} onClick={() => handleClose(index)}>Detail</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} onClick={() => handleClose(index)}>Edit</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} onClick={() => handleClose(index)}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default Anchorx
