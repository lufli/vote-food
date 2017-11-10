import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import ShowCase from './pages/show_case';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ShowCase} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
