import { Box } from "@mui/material"
import { Message } from "./Message"


export const MessageList = () => {
    return (
        <Box sx={{ height: "73vh", display: "block" }}>
          <Message isOwnMessage={false}  />
          <Message isOwnMessage={true}  />
        </Box>
    )
}