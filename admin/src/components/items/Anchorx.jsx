import { useState } from 'react'

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Settings } from '@mui/icons-material';

// Anchorx Component - Dynamic Menu Builder
// Props:
//   - index: Index dari row (number)
//   - data: Objek data item (optional)
//   - menuItems: Array of menu items dengan struktur [{ label: 'Detail', onClick: (index, data) => {} }, ...]
//
// Contoh penggunaan:
// const dataItem = { id: 1, uraian: 'Test', status: 'Active' };
// const menuItems = [
//   { label: 'Detail', onClick: (index, data) => console.log(data) },
//   { label: 'Edit', onClick: (index, data) => console.log(data) },
//   { label: 'Delete', onClick: (index, data) => console.log(data) }
// ];
// <Anchorx index={0} data={dataItem} menuItems={menuItems} />

function Anchorx({ index, data = {}, menuItems = [] }) {
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

    const handleMenuClick = (callback) => {
        callback(index, data);
        handleCloseAnchor();
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
                {menuItems.map((item, itemIndex) => (
                    <MenuItem
                        key={itemIndex}
                        sx={{ fontSize: 12 }}
                        onClick={() => handleMenuClick(item.onClick)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default Anchorx