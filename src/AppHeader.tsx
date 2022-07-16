import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export const AppHeader = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                    >
                        <RotateLeftIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Chat App
                    </Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                    >
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}