import * as React from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { ListItemSatu } from "@assets/styling/style.js";
import menuConfig from "@configs/menuConfig";
import stylex from "@assets/styling/stylex.js";

import KopImage from '@assets/img/kop.png';

const drawerWidth = 240;


import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import StopIcon from '@mui/icons-material/Stop';


const iconMap = {
    'InboxIcon': InboxIcon,
    'MailIcon': MailIcon,
    'DashboardIcon': DashboardIcon,
    'FiberManualRecordIcon': FiberManualRecordIcon,
    'SettingsIcon': SettingsIcon,
    'PeopleAltIcon': PeopleAltIcon,
    'LogoutIcon': LogoutIcon,
    'StopIcon': StopIcon

    // Tambahkan ikon lain di sini
};

export default function SideBar({ variant, open, onClose }) {
    const [openMenus, setOpenMenus] = React.useState({});

    // ====== MAPPING ICON ====== 
    const mapIcon = (data) => {
        return iconMap[data] || null
    }
    // ====== MAPPING ICON ======

    const handleToggle = (title) => {
        setOpenMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    // render menu recursive
    const renderMenu = (items, level = 1) => {
        return items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenus[item.title] || false;
            const IconComponent = mapIcon(item.icon);


            return (
                <React.Fragment key={item.title}>
                    <ListItemSatu disablePadding>
                        <ListItemButton
                            component={item.path ? Link : "div"}
                            to={item.path || ""}
                            onClick={hasChildren ? () => handleToggle(item.title) : undefined}
                            sx={{ pl: level > 1 ? level * 2 : 2 }} // indentasi dinamis
                        >
                            {IconComponent && (
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <IconComponent sx={level > 2 ? { fontSize: 8 } : {}} />
                                </ListItemIcon>
                            )}
                            <ListItemText
                                primaryTypographyProps={
                                    level === 1
                                        ? stylex.sideBarText1
                                        : level === 2
                                            ? stylex.sideBarText2
                                            : stylex.sideBarText3
                                }
                                primary={item.title}
                            />
                            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                    </ListItemSatu>

                    {hasChildren && (
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {renderMenu(item.children, level + 1)}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            );
        });
    };

    const drawerContent = (
        <Box sx={{ overflow: "auto" }}>
            {/* Logo */}
            <Box sx={{ width: "100%" }}>
                <img
                    src={KopImage}
                    // src="https://img.freepik.com/premium-vector/white-elegant-blue-background_662550-436.jpg"
                    // src="https://simpegv2.konaweselatankab.go.id/images/banner.png"
                    alt="No image"
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                    }}
                />
            </Box>

            <List>{renderMenu(menuConfig)}</List>
        </Box>
    );

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    transition: "transform 0.3s ease-in-out",
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
}
