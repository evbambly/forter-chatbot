import './App.css';
import { AppHeader } from './AppHeader';
import { InputMessage } from './InputMessage';
import { MessageList } from './MessageList';
import { OnlineUsersDrawer } from './OnlineUsersDrawer';


function App() {

  return (
    <div className="App">
        <AppHeader />
        <MessageList />
        Your Name Is
        <InputMessage />
        <OnlineUsersDrawer />
    </div>
  );
}

export default App;
