
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
import AdminOnlyRoute from '../../utils/AdminOnlyRoute';
import Navigation from '../Nav/Nav';
import './App.css';
import Footer from '../Footer/Footer';

function App() {
  return (
    <Fragment>
      <Route path='/' component={Navigation} />
      <main>
        <ErrorPage>
          <Switch>
            <PublicOnlyRoute
              exact path = {'/'}
              component = {LandingPage}/>
            <PublicOnlyRoute
              path = {'/browse'}
              component = {PublicHomePage}/>
            <PublicOnlyRoute
              path = {'/register'}
              component = {RegistrationPage}/>
            <PrivateRoute 
              path={'/home'}
              component={PrivateHomePage}/>
            <PrivateRoute
              path={'/settings'}
              component={UserSettingsPage}/>
            <AdminOnlyRoute
              path={'/admin'}
              component={AdminDashboardPage}/>
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </ErrorPage>
      </main>
      <Route path='/' component={Footer} />
    </Fragment>
  );
}

export default App;
