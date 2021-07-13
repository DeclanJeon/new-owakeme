import './App.css';
import { BrowserRouterHook } from './utils/use-router'
import { Switch, Route } from 'react-router-dom';
import Index from './pages/index'
import Room from './pages/room'
import Chatting from './pages/chatting'
import ShareScreen from './pages/shareScreen'

function App() {
  return (
    <BrowserRouterHook>
      <Switch>
        <Route exact path="/shareScreen" component={ShareScreen}></Route>
        <Route exact path="/chatting" component={Chatting}></Route>
        <Route exact path="/room" component={Room}></Route>
        <Route path="/" component={Index}></Route>
      </Switch>
    </BrowserRouterHook>
  );
}

export default App;
