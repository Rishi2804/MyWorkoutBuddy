import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#58A5F8'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins'
        },
        contained: {
          color: 'white'
        },
        outlined: {
          border: '2px solid',
          '&:hover': {
            border: '2px solid'
          }
        }
      },
    },
  },
});

const PrimaryButtonThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default PrimaryButtonThemeProvider;