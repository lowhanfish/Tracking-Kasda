// src/config/menuConfig.js
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import StopIcon from '@mui/icons-material/Stop';

import axios from "axios";

const token = localStorage.getItem("authToken");


// console.log("Token dari menu : ", token)


// export const getmenuItem = ()=>{
//   console.log("aaaaaaaa")
// }

export const getmenuItem = (URL) => {
  axios.post(URL, JSON.stringify({}), {
    headers : {
      'Authorization' : `kikensbatara ${token}`,
      'Content-Type' : 'application/json'
    }
  }).then((result) => {
    console.log("dari config/menuCinfig")
    // console.log(result.data)
  }).catch(error => {
    console.log(error)
  })
}


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
            title: "Registrasi Dokumen SPP-SPM",
            path: "/RegistrasiDokumen",
            icon: 'StopIcon',
            multiple : false,
          },
          {
            title: "Verifikasi Dokumen",
            path: "/VerifikasiDokumen",
            icon: 'StopIcon',
            multiple : false,
          },
          
          {
            title: "Tracking",
            path: "/TrackingDokumen",
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
            path: "/userGroup",
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
      {
        title: "Data Config",
        multiple : true,
        icon: 'StopIcon',
        children: [
          {
            title: "Master Tahapan",
            path: "/MasterTahapan",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "Master Pencairan",
            path: "/MasterRole",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "Master PPN",
            path: "/MasterPPN",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
          {
            title: "Master PPH",
            path: "/MasterPPH",
            icon: 'FiberManualRecordIcon',
            multiple : false,
          },
        
          
        ],
      },
    ],
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
