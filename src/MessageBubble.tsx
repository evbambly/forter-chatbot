import { Box, Card, Typography } from "@mui/material"
import { Message } from "./types"

export type MessageProps = {
    name: string,
    message: Message,
}

export const MessageBubble = ({ name, message }: MessageProps) => {
    const isOwnMessage = name === message.name
    const messageDirection = {
        ...isOwnMessage ? { marginLeft: "auto" } : { marginRight: "auto" }
    }

    const messageTime = new Date(message.sentAtMillis).toTimeString().split(' ')[0].slice(0, 5)
    const shortName = message.name?.slice(0, 7)
    return (
        <Box sx={{ maxWidth: "70%", margin: "5%", width: "fit-content", ...messageDirection }} >
            <Typography sx={{ fontSize: 12 }} align="left">
                {shortName ?? "Anonymous"}
            </Typography>
            <Card sx={{ padding: ".3em .6em", width: "fit-content" }}>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    {message.text}
                </Typography>
            </Card>
            <Typography sx={{ fontSize: 12 }} align="right">
                {messageTime}
            </Typography>
        </Box>
    )
}