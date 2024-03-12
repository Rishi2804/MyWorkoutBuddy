import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#65ca79"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white'
        }
      }
    }
  }
});

const FinishButtonThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default FinishButtonThemeProvider;