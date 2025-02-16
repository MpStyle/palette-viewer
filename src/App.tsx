import './App.css';
import {FunctionComponent, useEffect, useState} from "react";
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
import {useNavigate, useParams} from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import {colorsSeparator, getContrastColor, getRandomPalette} from "./book/Constants.ts";

export const App: FunctionComponent=()=> {
    const {colorList} = useParams();
    const colors = colorList ? colorList.split(colorsSeparator).map(c=>`#${c}`) : [];
    const navigate = useNavigate();
    const ItemType = 'COLOR';
    const [open, setOpen] = useState<boolean>(false);
    const [newColor, setNewColor] = useState<string>('');
    const [newColorPosition, setNewColorPosition] = useState<number>(-1);
    const [openSnackbarCopied, setOpenSnackbarCopied] = useState<boolean>(false);

    const navigateToPalette = (colors: string[]) => {
        navigate(`/${colors.map(c=>c.substring(1)).join(colorsSeparator).toLowerCase()}`);
    }

    useEffect(() => {
        if (colors.length === 0) {
            navigateToPalette(getRandomPalette());
        }
    }, []);

    const removeColor = (index: number) => {
        const newColors = colors.filter((_, i) => i !== index);
        navigateToPalette(newColors);
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
        navigateToPalette(newColors);
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

                <IconButton
                    size="large"
                    aria-label="New random palette"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => navigateToPalette(getRandomPalette())}
                    color="inherit"
                >
                    <RefreshIcon />
                </IconButton>
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
                    navigateToPalette(newColors);
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