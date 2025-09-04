import { styled, alpha } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import InputBase from "@mui/material/InputBase";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Popper from "@mui/material/Popper";

// Custom ListItem untuk sidebar
const ListItemSatu = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));

const Fieldx = styled(TextField)(({theme})=>({
  backgroundColor :'#fff',
  borderRadius : 4,
  "& .MuiInputBase-input": {
    fontSize: "13px",   // ukuran teks input
    padding: "8px 10px" // padding dalam input
  }
}));
const FieldxKamio = styled(TextField)(({theme})=>({
  backgroundColor :'purple',
}));


const Selectx = styled(Select)(() => ({
  width: "100%",
  background: "white",
  borderRadius: 4,
  "& .MuiInputBase-input": {
    fontSize: 13,
    padding: "6px 8px"
  }
}));
const MenuItemx = styled(MenuItem)(() => ({
  fontSize: 13,
}));

const Autocompletex = styled(Autocomplete)(() => ({
  width: "100%",
  background: "white",
  borderRadius: 4,
  "& .MuiInputBase-input": {
    fontSize: 13,
    padding: "6px 8px"
  }
}));

const Popperx = styled(Popper)(() => ({
  "& .MuiAutocomplete-option": {
    fontSize: 13,
    padding: "4px 8px"
  }
}));



export { ListItemSatu, BootstrapInput, Fieldx, Autocompletex, Popperx, Selectx, MenuItemx, FieldxKamio };
