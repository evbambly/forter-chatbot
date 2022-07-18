import { Box } from "@mui/material"
import { useEffect } from "react";
import { MessageBubble } from "../components/MessageBubble"
import { getMessages, listenToNewMessages } from "../firebase/Functions";
import { Message } from "../logic/Types";
import { DocumentData } from "firebase/firestore";

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
    // eslint-disable-next-line
  }, [])



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
    // eslint-disable-next-line
  }, [])


  return (
    <Box sx={{ height: "76vh", display: "block", overflowY: "scroll", flexGrow: 1 }}>
      <div style={{visibility: "hidden"}}  id="back-to-top-anchor" />
      {messages?.length === 0 ? "No Messages Yet!" :
        messages?.map(message =>
          <MessageBubble name={name} message={message} key={message.sentAtMillis + message.text} />
        )
      }
    </Box>
  )
}