import { Outlet, useLocation } from "react-router-dom";
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";

const drawerWidth = 240;

export default function MainLayout() {
    const theme = useTheme();
    const isTabletOrBelow = useMediaQuery("(max-width:1024px)");

    const [desktopOpen, setDesktopOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleButtonRef = useRef(null);

    const handleDrawerToggle = () => {
        if (isTabletOrBelow) {
            setMobileOpen((prev) => !prev);
        } else {
            setDesktopOpen((prev) => !prev);
        }
    };

    useEffect(() => {
        if (isTabletOrBelow) {
            setMobileOpen(false);
        } else {
            setDesktopOpen(true);
        }
    }, [isTabletOrBelow]);

    // ambil path saat ini
    const location = useLocation();

    // konversi path ke judul
    const getPageTitle = (pathname) => {
        switch (pathname) {
            case "/":
            case "/Dashboard":
                return "e-Tracking";
            case "/profile":
                return "Profile";
            case "/Template1":
                return "Template 1";
            case "/Template2":
                return "Template 2";
            case "/Documentation":
                return "Documentation";
            case "/Registration":
                return "Add User";
            case "/settings":
                return "Settings";
            case "/AccessSetting":
                return "User groups";
            case "/MenuSetting":
                return "Menu Setting";
            // tambahkan route lain sesuai kebutuhan
            default:
                return "";
        }
    };

    const pageTitle = getPageTitle(location.pathname);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: isTabletOrBelow
                        ? "100%"
                        : desktopOpen
                            ? `calc(100% - ${drawerWidth}px)`
                            : "100%",
                    ml: isTabletOrBelow ? 0 : desktopOpen ? `${drawerWidth}px` : 0,
                    transition: theme.transitions.create(["margin", "width"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    background: '#6aaeff',
                }}
            >
                <Toolbar>
                    <IconButton
                        ref={toggleButtonRef}
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        {(isTabletOrBelow ? mobileOpen : desktopOpen)
                            ? <MenuOpenIcon />
                            : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            {
                isTabletOrBelow ? (
                    <SideBar
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                    />
                ) : (
                    <SideBar
                        variant="persistent"
                        open={desktopOpen}
                        onClose={handleDrawerToggle}
                    />
                )
            }

            {/* Konten */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    width: isTabletOrBelow
                        ? "100%"
                        : desktopOpen
                            ? `calc(100% - ${drawerWidth}px)`
                            : "100%",
                    ml: isTabletOrBelow ? 0 : desktopOpen ? `${drawerWidth}px` : 0,
                    transition: theme.transitions.create(["margin", "width"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box >
    );
}
