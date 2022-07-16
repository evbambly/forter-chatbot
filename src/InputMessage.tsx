import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import DirectionsIcon from '@mui/icons-material/Directions';
import SendIcon from '@mui/icons-material/Send';


export const InputMessage = ( ) => {
    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80vw", margin: "auto" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Type Message"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SendIcon />
        </IconButton>
      </Paper>
    )
}