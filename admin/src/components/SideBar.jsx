import React, { useState, useEffect } from "react";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import StopIcon from "@mui/icons-material/Stop";

import { ListItemSatu } from "@assets/styling/style.js";
import menuConfig, { getmenuItem } from "@configs/menuConfig";
import stylex from "@assets/styling/stylex.js";
import KopImage from '@assets/img/kop.png';

import useStorex from '@store/index.js'

const DRAWER_WIDTH = 240;

// Icon mapping untuk konversi string ke komponen
const ICON_MAP = {
    InboxIcon,
    MailIcon,
    DashboardIcon,
    FiberManualRecordIcon,
    SettingsIcon,
    PeopleAltIcon,
    LogoutIcon,
    StopIcon
};

export default function SideBar({ variant, open, onClose }) {
    const [openMenus, setOpenMenus] = React.useState({});


    const { url } = useStorex()
    getmenuItem(url.URL_MENU + '/getMenuSidebar');

    // Toggle menu expand/collapse
    const handleToggle = (title) => {
        setOpenMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    // Dapatkan style text berdasarkan level menu
    const getTextStyle = (level) => {
        if (level === 1) return stylex.sideBarText1;
        if (level === 2) return stylex.sideBarText2;
        return stylex.sideBarText3;
    };

    // Render single menu item
    const renderMenuItem = (item, level) => {
        const hasChildren = item.children?.length > 0;
        const isOpen = openMenus[item.title] || false;
        const IconComponent = ICON_MAP[item.icon];
        const indentLevel = level > 1 ? level * 2 : 2;

        return (
            <React.Fragment key={item.title}>
                <ListItemSatu disablePadding>
                    <ListItemButton
                        component={item.path ? Link : "div"}
                        to={item.path || ""}
                        onClick={hasChildren ? () => handleToggle(item.title) : undefined}
                        sx={{ pl: indentLevel }}
                    >
                        {IconComponent && (
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <IconComponent sx={level > 2 ? { fontSize: 8 } : {}} />
                            </ListItemIcon>
                        )}
                        <ListItemText
                            primary={item.title}
                            primaryTypographyProps={getTextStyle(level)}
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
    };

    // Render menu secara recursive
    const renderMenu = (items, level = 1) => {
        return items.map((item) => renderMenuItem(item, level));
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("profile");
    };

    useEffect(() => {


    }, [])

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    transition: "transform 0.3s ease-in-out",
                },
            }}
        >
            <Box sx={{ overflow: "auto" }}>
                {/* Logo Header */}
                <Box sx={{ width: "100%" }}>
                    <img
                        src={KopImage}
                        alt="Logo"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                    />
                </Box>

                {/* Menu Items */}
                <List>{renderMenu(menuConfig)}</List>

                {/* Logout Button */}
                <List sx={{ marginTop: -2 }}>
                    <ListItemSatu disablePadding>
                        <ListItemButton component={Link} to="/" onClick={handleLogout}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Logout"
                                primaryTypographyProps={stylex.sideBarText1}
                            />
                        </ListItemButton>
                    </ListItemSatu>
                </List>
            </Box>
        </Drawer>
    );
}
