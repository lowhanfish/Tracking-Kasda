// src/config/menuConfig.js
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import StopIcon from '@mui/icons-material/Stop';

import axio from "axios";

const menuConfig = [
  {
    title: "Dashboard",
    icon: 'DashboardIcon',
    path: "/Dashboard",
    multiple : false,
  },
  {
    title: "Profile",
    icon: 'PeopleAltIcon',
    path: "/profile",
    multiple : false,
  },
  {
    title: "e-Tracking",
    icon: 'InboxIcon',
    multiple : true,
    children: [
          {
            title: "Add User",
            path: "/Registration",
            icon: 'StopIcon',
            multiple : false,
          },
          {
            title: "User List",
            path: "/Dashboard",
            icon: 'StopIcon',
            multiple : false,
          },
          
        ],
  },
  {
    title: "Master Data",
    icon: 'SettingsIcon',
    multiple : true,
    children: [
      {
        title: "User Management",
        multiple : true,
        icon: 'StopIcon',
        children: [
          {
            title: "Add User",
            path: "/Registration",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "User groups",
            path: "/AccessSetting",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "Menu Setting",
            path: "/MenuSetting",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
        ],
      },
      {
        title: "Template",
        multiple : true,
        icon: 'StopIcon',
        children: [
          {
            title: "Template 1",
            path: "/Template1",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "Template 2",
            path: "/Template2",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "Documentation",
            path: "/Documentation",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          
        ],
      },
    ],
  },
  {
    title: "wkwkwkwk",
    path: "/",
    icon: 'LogoutIcon',
    multiple : false,
  },
];
// const menuConfig = [
//   {
//     title: "Dashboard",
//     icon: DashboardIcon,
//     path: "/Dashboard",
//     multiple : false,
//   },
//   {
//     title: "Profile",
//     icon: PeopleAltIcon,
//     path: "/profile",
//     multiple : false,
//   },
//   {
//     title: "e-Tracking",
//     icon: InboxIcon,
//     multiple : true,
//     children: [
//           {
//             title: "Add User",
//             path: "/Registration",
//             icon: StopIcon,
//             multiple : false,
//           },
//           {
//             title: "User List",
//             path: "/Dashboard",
//             icon: StopIcon,
//             multiple : false,
//           },
          
//         ],
//   },
//   {
//     title: "Master Data",
//     icon: SettingsIcon,
//     multiple : true,
//     children: [
//       {
//         title: "User Management",
//         multiple : true,
//         icon: StopIcon,
//         children: [
//           {
//             title: "Add User",
//             path: "/Registration",
//             icon: FiberManualRecordIcon,
//             multiple : false,
//           },
//           {
//             title: "User groups",
//             path: "/Dashboard",
//             icon: FiberManualRecordIcon,
//             multiple : false,
//           },
//           {
//             title: "Access Settingsz",
//             path: "/AccessSetting",
//             icon: FiberManualRecordIcon,
//             multiple : false,
//           },
//         ],
//       },
//       {
//         title: "Template",
//         multiple : true,
//         icon: StopIcon,
//         children: [
//           {
//             title: "Template 1",
//             path: "/Template1",
//             icon: FiberManualRecordIcon,
//             multiple : false,
//           },
//           {
//             title: "Template 2",
//             path: "/Template2",
//             icon: FiberManualRecordIcon,
//             multiple : false,
//           },
//           {
//             title: "Documentation",
//             path: "/Documentation",
//             icon: FiberManualRecordIcon,
//             multiple : false,
//           },
          
//         ],
//       },
//     ],
//   },
//   {
//     title: "Logout",
//     path: "/",
//     icon: LogoutIcon,
//     multiple : false,
//   },
// ];






export default menuConfig;
