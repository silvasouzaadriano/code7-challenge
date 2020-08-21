import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import AddDebit from '../pages/Debit/Add';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/addDebit" exact component={AddDebit} />
  </Switch>
);

export default Routes;
