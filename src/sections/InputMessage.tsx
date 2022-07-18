import { IconButton, InputBase, Paper } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { KeyboardEventHandler, useState } from "react";
import { sendMessage } from "../firebase/Functions";

export type InputMessageProps = {
    name: string
}

export const InputMessage = ({ name }: InputMessageProps) => {
    const [text, setText] = useState("")

    const handleSendMessage = () => {
        if (text.length === 0) return
        sendMessage()({ text, name })
        setText("")
    }

    const handleEnter: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (e) => {
        if (e.key !== 'Enter') return

        e.preventDefault()
        handleSendMessage()
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80vw", margin: "5% auto" }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type Message"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleEnter}
            />
            <IconButton
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={handleSendMessage}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    )
}