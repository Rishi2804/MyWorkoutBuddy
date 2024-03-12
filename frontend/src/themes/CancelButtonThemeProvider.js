import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ec6569'
    },
  }
});

const CancelButtonThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default CancelButtonThemeProvider;