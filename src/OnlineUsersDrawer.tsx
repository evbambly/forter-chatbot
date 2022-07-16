import { Box, Button, Skeleton, styled, SwipeableDrawer, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from "react"


export type OnlineUsersDrawerProps = {
    isDrawerOpen: boolean,
    setIsDrawerOpen: (isOpen: boolean) => void
}

export const OnlineUsersDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const Puller = styled(Box)(({ theme }) => ({
        width: 30,
        height: 6,
        backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    }));

    return (
        <>
            <Button onClick={() => setIsDrawerOpen(true)}>Show Online Users</Button>
            <SwipeableDrawer
                anchor="bottom"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onOpen={() => setIsDrawerOpen(true)}
                swipeAreaWidth={56}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}

            >
                <Puller />
                <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>

                <Skeleton variant="rectangular" height="100%" />
            </SwipeableDrawer>
        </>
    )
}