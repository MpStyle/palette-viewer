import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTheme, ThemeProvider} from "@mui/material";
import {blueGrey, lightBlue} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: blueGrey,
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
