import { useEffect, useState } from 'react';
import './App.css';
import { AppHeader } from './AppHeader';
import { InputMessage } from './InputMessage';
import { MessageList } from './MessageList';
import { OnlineUsersDrawer } from './OnlineUsersDrawer';
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from './FirebaseConfig';
import { getOrDefineName, getUniqueMessages } from './Utils';
import { LinearProgress } from '@mui/material';
import { Message } from './types';
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
    <div className="App">
      <AppHeader setMessages={sortMessages} />
      {!firebaseApp && <LinearProgress />}
      Your Name Is {name}
      {firebaseApp && <MessageList name={name} messages={messages} setMessages={sortMessages} />}
      <InputMessage name={name} />
      <OnlineUsersDrawer />
    </div>
  );
}

export default App;
