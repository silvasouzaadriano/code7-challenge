import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import AddDebit from '../pages/Debit/Add';
import ViewDebitDetail from '../pages/Debit/Detail';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/addDebit/:route/:client_id" exact component={AddDebit} />
    <Route
      path="/viewDebitDetail/:client_id"
      exact
      component={ViewDebitDetail}
    />
  </Switch>
);

export default Routes;
