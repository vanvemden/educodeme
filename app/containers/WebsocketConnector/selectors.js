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

const getSelectWebsocketConnectorActionsCount = () =>
  createSelector(
    makeSelectWebsocketConnectorValueOfKey('actions'),
    actions => actions.length,
  );

const getSelectWebsocketConnectorId = () =>
  createSelector(
    makeSelectWebsocketConnectorValueOfKey('id'),
    id => id,
  );

const makeSelectWebsocketConnectorValueOfKey = key =>
  createSelector(
    selectWebsocketConnectorDomain,
    websocketState => websocketState[key],
  );

export {
  getSelectWebsocketConnectorActionsCount,
  getSelectWebsocketConnectorId,
  makeSelectWebsocketConnector,
  makeSelectWebsocketConnectorValueOfKey,
  selectWebsocketConnectorDomain,
};
