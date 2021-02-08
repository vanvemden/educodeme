/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import HomePage from 'contents/HomePage/Loadable';
import Dashboard from 'contents/Dashboard/Loadable';
import NotFoundPage from 'contents/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <StylesProvider injectFirst>
      <Switch>
        <Route exact path="/session/:id" component={Dashboard} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </StylesProvider>
  );
}
