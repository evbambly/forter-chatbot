import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { getMessages } from "./Functions";
import { Message } from "./types";

export type AppHeaderProps = {
    setMessages: (messages: Message[]) => void
}

export const AppHeader = ({ setMessages }: AppHeaderProps) => {

    const handleClick = async () => {
        const messages = await getMessages()(0)
        if (Array.isArray(messages.data))
            setMessages(messages.data)
    }


    const handleScrollTop = (event: React.MouseEvent<HTMLButtonElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" id="back-to-top-anchor">
                <Toolbar>
                    <Tooltip title="Get all messages">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleClick}
                        >
                            <RotateLeftIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Chat App
                    </Typography>
                    <Tooltip title="Search">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleScrollTop}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    )
}