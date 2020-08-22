import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import AddDebit from '../pages/Debit/Add';
import ViewDebitDetail from '../pages/Debit/Detail';
import EditDebit from '../pages/Debit/Edit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/addDebit/:route/:client_id" exact component={AddDebit} />
    <Route
      path="/viewDebitDetail/:client_id"
      exact
      component={ViewDebitDetail}
    />
    <Route path="/editDebit/:id" exact component={EditDebit} />
  </Switch>
);

export default Routes;
