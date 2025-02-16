import './App.css'
import {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import {useDrag, useDrop} from 'react-dnd';
import {SketchPicker} from 'react-color';

const colorPalettes = [
    ["#2C3E50", "#BDC3C7", "#8E44AD", "#ECF0F1", "#34495E"], // Elegant
    ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5", "#FF8B94"], // Relaxing
    ["#0D0D0D", "#1A1A1A", "#00FFFF", "#00FF99", "#FF00FF"], // Tech
    ["#000000", "#3700FF", "#00F6ED", "#FA00FF", "#FFFFFF"], // Futuristic
    ["#FF5E78", "#FF9A8C", "#FFD3B4", "#FFF5D7", "#FF7597"], // Romantic
    ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"], // Brutalist
    ["#F4A261", "#E76F51", "#2A9D8F", "#264653", "#E9C46A"], // Earthy
    ["#3E92CC", "#2A628F", "#13293D", "#F9C80E", "#F86624"], // Oceanic
    ["#6A0572", "#AB83A1", "#E5C3D1", "#F5E6E8", "#FFB5A7"], // Pastel
    ["#3D348B", "#7678ED", "#F7B801", "#F35B04", "#A4036F"], // Bold
    ["#1B1B1B", "#525252", "#969696", "#DADADA", "#FFFFFF"], // Monochrome
    ["#FF9F1C", "#FFBF69", "#CBF3F0", "#2EC4B6", "#E71D36"], // Playful
    ["#0F4C81", "#00A8E8", "#7A77B9", "#B8C5D6", "#F3E8EE"], // Cool Tones
    ["#1A1423", "#3D314A", "#684756", "#96705B", "#AB8476"], // Vintage
    ["#ED6A5A", "#F4F1BB", "#9BC1BC", "#5D576B", "#E6EBE0"], // Warm & Cozy
    ["#D90368", "#820263", "#291720", "#04A777", "#F2A007"]  // Neon
];

function App() {
    const ItemType = 'COLOR';

    const getRandomPalette = () => {
        const randomIndex = Math.floor(Math.random() * colorPalettes.length);
        return colorPalettes[randomIndex];
    };

    const [colors, setColors] = useState<string[]>(getRandomPalette());
    const [open, setOpen] = useState<boolean>(false);
    const [newColor, setNewColor] = useState<string>('');
    const [newColorPosition, setNewColorPosition] = useState<number>(-1);
    const [openSnackbarCopied, setOpenSnackbarCopied] = useState<boolean>(false);

    const getContrastColor = (color: string) => {
        const hex = color.charAt(0) === '#' ? color.substring(1, 7) : color;
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155 ? 'black' : 'white';
    };

    const removeColor = (index: number) => {
        const newColors = colors.filter((_, i) => i !== index);
        setColors(newColors);
    };

    const copyColorName = (color: string) => {
        navigator.clipboard.writeText(color);
        setOpenSnackbarCopied(true);
    };

    const handleCloseSnackbarCopied = () => {
        setOpenSnackbarCopied(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewColorOpen = (position: number) => {
        setNewColorPosition(position);
        setOpen(true);
    }

    const AddNewColorButton = (props: { position: number }) => {
        return <IconButton
            size="large"
            aria-label="add new color"
            onClick={() => handleNewColorOpen(props.position)}>
            <AddIcon/>
        </IconButton>;
    }

    const moveColor = (dragIndex: number, hoverIndex: number) => {
        const newColors = Array.from(colors);
        const [movedColor] = newColors.splice(dragIndex, 1);
        newColors.splice(hoverIndex, 0, movedColor);
        setColors(newColors);
    };

    const ColorBand = ({color, index}: { color: string, index: number }) => {
        const [{isDragging}, ref] = useDrag({
            type: ItemType,
            item: {index},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: ItemType,
            hover: (item: { index: number }) => {
                if (item.index !== index) {
                    moveColor(item.index, index);
                    item.index = index;
                }
            },
        });

        const handleMouseMove = (event: React.MouseEvent) => {
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const mouseX = event.clientX;
            const leftDistance = mouseX - rect.left;
            const rightDistance = rect.right - mouseX;

            const addColors = document.querySelectorAll('.add-color button');

            for (let i = 0; i < addColors.length; i++) {
                const addColor = addColors[i] as HTMLElement;
                if (leftDistance < 30 || rightDistance < 30) {
                    addColor.style.display = 'block';
                } else {
                    addColor.style.display = 'none';
                }
            }
        };

        return <Stack className="color-band-container"
                      direction='column'
                      component="div"
                      ref={(node) => {
                          ref(drop(node));
                      }}
                      onMouseMove={e => {
                          handleMouseMove(e);
                      }}
                      style={{
                          backgroundColor: color,
                          width: `${100 / colors.length}%`,
                          opacity: isDragging ? 0.5 : 1,
                      }}>
            {index === 0 && <Box className='add-color add-color-left'>
                <AddNewColorButton position={0}/>
            </Box>}
            {index !== 0 &&
                <Box className='add-color'>
                    <AddNewColorButton position={index}/>
                </Box>}

            <div style={{flex: 1}}/>

            <Stack spacing={1} className="color-actions">
                <IconButton sx={{color: getContrastColor(color)}}
                            aria-label="delete"
                            title="Delete"
                            size="medium"
                            onClick={() => removeColor(index)}>
                    <ClearIcon fontSize="inherit"/>
                </IconButton>
                <IconButton sx={{color: getContrastColor(color)}}
                            aria-label="move"
                            title="Move"
                            size="medium">
                    <DragIndicatorIcon fontSize="inherit"/>
                </IconButton>
                <IconButton sx={{color: getContrastColor(color)}}
                            aria-label="copy"
                            title="Copy"
                            size="medium"
                            onClick={() => copyColorName(color)}>
                    <ContentCopyIcon fontSize="inherit"/>
                </IconButton>
            </Stack>

            <div className="color-name"
                 style={{color: getContrastColor(color)}}
                 onClick={() => {
                     setNewColor(color);
                     handleNewColorOpen(index)
                 }}>
                {color.startsWith("#") ? color.substring(1) : color}
            </div>

            {index === colors.length - 1 &&
                <Box className='add-color add-color-right'>
                    <AddNewColorButton position={colors.length}/>
                </Box>}
        </Stack>;
    };

    return <div className="app">
        <AppBar position="static" className='app-bar'>
            <Toolbar>
                <Typography variant="h6" component="div" className='app-title'>
                    Palette viewer
                </Typography>
            </Toolbar>
        </AppBar>

        <Stack direction="row" className="colors-container">
            {colors.map((color, index) =>
                <ColorBand key={index} color={color} index={index}/>
            )}
        </Stack>

        <Snackbar
            open={openSnackbarCopied}
            autoHideDuration={4000}
            onClose={handleCloseSnackbarCopied}
            message="Color copied to clipboard"
            action={
                <Button color="secondary" size="small" onClick={handleCloseSnackbarCopied}>
                    <CloseIcon fontSize="small"/>
                </Button>
            }
        />

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Choose color
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: 1}}>
                    <SketchPicker
                        width={'calc(100% - (24px))'}
                        color={newColor}
                        onChange={(e) => {
                            setNewColor(e.hex);
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                    const newColors = [...colors];
                    newColors.splice(newColorPosition, 0, newColor);
                    setColors(newColors);
                    setNewColor('');
                    setNewColorPosition(-1)
                    handleClose();
                }} autoFocus variant={"contained"}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default App
