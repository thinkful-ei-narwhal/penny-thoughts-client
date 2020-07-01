import React, {Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import PublicHomePage from '../../routes/PublicHomePage/PublicHomePage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import PrivateHomePage from '../../routes/PrivateHomePage/PrivateHomePage';
import UserSettingsPage from '../../routes/UserSettingsPage/UserSettingsPage';
import AdminDashboardPage from '../../routes/AdminDashboardPage/AdminDashboardPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import PrivateRoute from '../../utils/PrivateRoute';
import PublicOnlyRoute from '../../utils/PublicOnlyRoute';
import './App.css';

function App() {
  return (
    <Fragment>
      <main>
        <ErrorPage>
          <Switch>
            <Route
              exact path = {'/'}
              component = {LandingPage}/>
            {/* make this public only */}
            <Route
              path = {'/browse'}
              component = {PublicHomePage}/>
            {/* make this public only */}
            <Route
              path = {'/register'}
              component = {RegistrationPage}/>
            {/* make this private*/}
            <Route 
              path={'/home'}
              component={PrivateHomePage}/>
            {/* make this private*/}
            <Route
              path={'/settings'}
              component={UserSettingsPage}/>
            {/* make this private*/}
            <Route
              path={'/admin'}
              component={AdminDashboardPage}/>
            {/* make this private*/}
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </ErrorPage>
      </main>
    </Fragment>
  );
}

export default App;
