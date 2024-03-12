import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e9eaea'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '30px'
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

const AddButtonThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default AddButtonThemeProvider;