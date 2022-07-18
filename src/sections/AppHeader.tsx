import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { getMessages } from "../firebase/Functions";
import { Message } from "../logic/Types";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export type AppHeaderProps = {
    setMessages: (messages: Message[]) => void
}

export const AppHeader = ({ setMessages }: AppHeaderProps) => {

    const handleGetAllMessages = async () => {
        const messages = await getMessages()(0)
        if (Array.isArray(messages.data))
            setMessages(messages.data)
    }


    const handleScrollTop = (event: React.MouseEvent<HTMLButtonElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');
        
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
        }
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Get all messages">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleGetAllMessages}
                        >
                            <RotateLeftIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Chat App
                    </Typography>
                    <Tooltip title="Back to Top">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleScrollTop}
                        >
                            <KeyboardArrowUpIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    )
}