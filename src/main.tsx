import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTheme, ThemeProvider} from "@mui/material";
import {blueGrey, lightBlue} from "@mui/material/colors";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {HashRouter, Route, Routes} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: blueGrey,
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/:colorList" element={<App />} />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </DndProvider>
    </StrictMode>,
)
