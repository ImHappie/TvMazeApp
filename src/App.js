import React from 'react';
import { Shows } from './Views/show/Shows';
import { Episodes } from './Views/episodes/Episodes';
import {Header} from './Views/Stateless/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
     <Router>
       <Header/>
        <Switch>
          <Route exact path="/">
          <Shows />
          </Route>
          <Route exact path="/show/:showId">
            <Episodes/>
          </Route>
        </Switch>
     </Router>
  );
}

export default App;
