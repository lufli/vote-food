import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Foo from './components/foo';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Foo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
