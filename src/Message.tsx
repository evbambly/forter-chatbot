import { Box, Card, Typography } from "@mui/material"

export type MessageProps = {
    isOwnMessage: boolean
}

export const Message = ({isOwnMessage}: MessageProps) => {
    const messageDirection = {
        ...isOwnMessage ? { marginLeft: "auto" } : { marginRight: "auto" }
    }

    return (
        <Box sx={{ maxWidth: "70%", margin: "5%", width: "fit-content", ...messageDirection }} >
            <Typography sx={{ fontSize: 12 }} align="left">
                UserName
            </Typography>
            <Card sx={{paddingRight: "2%", paddingLeft: "2%", width: "fit-content"}}>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Word of the Day
                </Typography>
            </Card>
            <Typography sx={{ fontSize: 12 }} align="right">
                Time
            </Typography>
        </Box>
    )
}