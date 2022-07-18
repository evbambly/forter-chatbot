import { useEffect, useState } from 'react';
import './App.css';
import { AppHeader } from './sections/AppHeader';
import { InputMessage } from './sections/InputMessage';
import { MessageList } from './sections/MessageList';
import { OnlineUsersDrawer } from './OnlineUsersDrawer';
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase/FirebaseConfig';
import { getOrDefineName, getUniqueMessages } from './logic/Utils';
import { LinearProgress, Typography } from '@mui/material';
import { Message } from './logic/Types';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

function App() {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>()
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    // Initialize Firebase
    setFirebaseApp(initializeApp(firebaseConfig))
    if (window.location.hostname === 'localhost') {
      const functions = getFunctions(getApp());
      connectFunctionsEmulator(functions, "localhost", 5001);
    }
  }, [])
  const sortMessages = (messages: Message[]) => {
    const sortedMessages = messages.sort((a, b) => b.sentAtMillis - a.sentAtMillis)
    const uniqueMessages = getUniqueMessages(sortedMessages)
    setMessages(uniqueMessages)
  }
  const name = getOrDefineName()

  

  return (
    <div className="App" style={{display: "flex", flexDirection: "column"}}>
      <AppHeader setMessages={sortMessages} />
      {!firebaseApp && <LinearProgress />}
      <Typography sx={{margin: "1%"}}>Your Name Is {name}</Typography> 
      {firebaseApp && <MessageList name={name} messages={messages} setMessages={sortMessages} />}
      <InputMessage name={name} />
      <OnlineUsersDrawer />
    </div>
  );
}

export default App;
