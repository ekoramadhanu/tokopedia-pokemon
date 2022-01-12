import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a75bb',
      dark: '#3c5aa6',
    },
    secondary: {
      main: '#ffcb05',
      dark: '#c7a008',
    },
  },
  spacing: 8,
});

export default theme;