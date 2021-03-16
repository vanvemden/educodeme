import { createSelector } from 'reselect';

import { socketInitialState } from './reducer';

/**
 * Direct selector to the Socket state domain
 */
const selectSocketDomain = state => state.socket || socketInitialState;

/**
 * Memoized selectors
 */

const selectSocket = () =>
  createSelector(
    selectSocketDomain,
    state => state,
  );

const selectSocketActionsCount = () =>
  createSelector(
    selectSocketValueOfKey('actions'),
    actions => actions.length,
  );

const selectSocketIsConnected = () =>
  createSelector(
    selectSocketDomain,
    state => state.isConnected,
  );

const selectSocketIsHost = () =>
  createSelector(
    selectSocketDomain,
    state => state.isHost,
  );

const selectSocketSessionId = () =>
  createSelector(
    selectSocketDomain,
    state => state.sessionId,
  );

const selectSocketSessionToken = () =>
  createSelector(
    selectSocketDomain,
    state => state.sessionToken,
  );

const selectSocketSessionTopic = () =>
  createSelector(
    selectSocketDomain,
    state => state.sessionTopic,
  );

const selectSocketUsername = () =>
  createSelector(
    selectSocketDomain,
    state => state.username,
  );

const selectSocketUserId = () =>
  createSelector(
    selectSocketDomain,
    state => state.userId,
  );

const selectSocketUserToken = () =>
  createSelector(
    selectSocketDomain,
    state => state.userToken,
  );

const selectSocketValueOfKey = key =>
  createSelector(
    selectSocketDomain,
    state => state[key],
  );

export {
  selectSocketActionsCount,
  selectSocketIsConnected,
  selectSocketIsHost,
  selectSocketSessionId,
  selectSocketSessionToken,
  selectSocketSessionTopic,
  selectSocketUserId,
  selectSocketUserToken,
  selectSocketUsername,
  selectSocket,
  selectSocketValueOfKey,
  selectSocketDomain,
};
