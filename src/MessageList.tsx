import { Box, Fab } from "@mui/material"
import { useEffect } from "react";
import { MessageBubble } from "./MessageBubble"
import { getMessages, listenToNewMessages } from "./Functions";
import { Message } from "./types";
import { DocumentData } from "firebase/firestore";
import { ScrollTop } from "./ScrollTop";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export type MessageListProps = {
  name: string,
  messages: Message[],
  setMessages: (messages: Message[]) => void
}

export const MessageList = ({ name, setMessages, messages }: MessageListProps) => {
  useEffect(() => {
    const now = new Date()
    const ONE_HOUR_IN_MILLIS = 60 * 60 * 1_000
    const pullMessages = async () => {
      const messages = await (await getMessages()(now.getTime() - ONE_HOUR_IN_MILLIS)).data
      if (Array.isArray(messages)) {
        setMessages(messages)
      }
    }
    pullMessages()
  }, [setMessages])



  useEffect(() => {
    const unsubscribe = listenToNewMessages((update: DocumentData | undefined) => {
      if (Array.isArray(update) && update as Message[]) {
        const now = new Date()
        const ONE_HOUR_IN_MILLIS = 60 * 60 * 1_000
        const filteredList = update.filter(m => now.getTime() - ONE_HOUR_IN_MILLIS < m.sentAtMillis)
        setMessages(filteredList)
      }
    })

    return () => unsubscribe()
  }, [setMessages])


  return (
    <Box sx={{ height: "73vh", display: "block", overflowY: "scroll" }} id="back-to-top-anchor">
      {messages?.length === 0 ? "No Messages Yet!" :
        messages?.map(message =>
          <MessageBubble name={name} message={message} key={message.sentAtMillis + message.text} />
        )
      }
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  )
}