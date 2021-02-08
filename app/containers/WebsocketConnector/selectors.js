import { createSelector } from 'reselect';

import { websocketConnectorInitialState } from './reducer';

/**
 * Direct selector to the WebsocketConnector state domain
 */
const selectWebsocketConnectorDomain = state =>
  state.websocketConnector || websocketConnectorInitialState;

/**
 * Memoized selectors
 */

const makeSelectWebsocketConnector = () =>
  createSelector(
    selectWebsocketConnectorDomain,
    websocketConnectorState => websocketConnectorState,
  );

const makeSelectWebsocketConnectorValueOfKey = key =>
  createSelector(
    selectWebsocketConnectorDomain,
    websocketState => websocketState[key],
  );

export {
  selectWebsocketConnectorDomain,
  makeSelectWebsocketConnector,
  makeSelectWebsocketConnectorValueOfKey,
};
