import React from 'react';
import { Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import FriendList from './components/FriendList';
import { Container } from '@material-ui/core'




function App() {

  return (
    
    <Switch>
      <Container maxWidth="md">
        <PrivateRoute path="/friendList" component={FriendList} />
        <Route exact path="/">
          <Login />
        </Route>
      </Container>
    </Switch>
  );
}

export default App;
