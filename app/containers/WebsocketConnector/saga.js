import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  websocketConnectorPublishActionFailure,
  websocketConnectorPublishActionSuccess,
  websocketConnectorPublishSessionFailure,
  websocketConnectorPublishSessionSuccess,
  websocketConnectorPublishUserSuccess,
  websocketConnectorSessionActionReceived,
  websocketConnectorSubscribeToSessionActionsFailure,
  websocketConnectorSubscribeToSessionActionsSuccess,
  websocketConnectorSubscribeToSessionFailure,
  websocketConnectorSubscribeToSessionSuccess,
  websocketConnectorSubscribeToSessionUsersFailure,
  websocketConnectorSubscribeToSessionUsersSuccess,
  websocketConnectorUnpublishSessionFailure,
  websocketConnectorUnpublishSessionSuccess,
  websocketConnectorUnpublishUserFailure,
  websocketConnectorUnpublishUserSuccess,
  websocketConnectorUnsubscribeSessionFailure,
  websocketConnectorUnsubscribeSessionSuccess,
} from './actions';
import {
  publishAction,
  publishSession,
  publishUser,
  subscribeToSession,
  subscribeToSessionActions,
  subscribeToSessionUsers,
  unpublishSession,
  unpublishUser,
  unsubscribeSession,
} from './api';
import {
  // WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_PUBLISH_USER_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_USER,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_UNPUBLISH_USER,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION,
} from './constants';
import {
  getSelectWebsocketConnectorActionsCount,
  getSelectWebsocketConnectorId,
  makeSelectWebsocketConnectorValueOfKey,
} from './selectors';
import { CODE_EDITOR_ON_CHANGE } from '../CodeEditor/constants';
import { TEXT_EDITOR_ON_CHANGE } from '../TextEditor/constants';

/**
 * @description Saga to  start livestream session.
 * @param {Object} Action object.
 * @param {string} params.payload - Action payload.
 * @param {string} params.payload.topic - Session topic.
 * @param {string} params.payload.username - Username of host.
 * @param {string} params.type - Action type.
 */
function* onPublishSession({ payload: { topic, username } }) {
  try {
    /** Api call to publish session */
    const { id, timestamp, token } = yield call(publishSession, {
      topic,
      username,
    });
    yield put(
      websocketConnectorPublishSessionSuccess({
        id,
        timestamp,
        token,
        topic,
        username,
      }),
    );
  } catch (error) {
    yield put(websocketConnectorPublishSessionFailure({ error }));
  }
}

/**
 * @description Saga to unpublish session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id Session id.
 * @param {string} payload.token Session token.
 */
function* onUnpublishSession({ payload: { id, token } }) {
  try {
    yield call(unpublishSession, {
      id,
      token,
    });
    yield put(websocketConnectorUnpublishSessionSuccess({ id }));
  } catch (error) {
    yield put(websocketConnectorUnpublishSessionFailure({ error }));
  }
}

/**
 * @description Saga for publishing a user connecting to a session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.sessionId Id of session connecting to.
 * @param {string} payload.username Username
 */
function* onPublishUser({ payload: { id: sessionId, username } }) {
  try {
    const { id, token } = yield call(publishUser, { sessionId, username });
    yield put(
      websocketConnectorPublishUserSuccess({ id, sessionId, token, username }),
    );
  } catch (error) {
    yield put(websocketConnectorPublishSessionFailure({ error }));
  }
}

/**
 * @description Saga for unpublishing a user connected to a session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id User id.
 * @param {string} payload.token User token
 * @param {string} payload.username Username
 */
function* onUnpublishUser({ payload: { id, sessionId, token } }) {
  try {
    yield call(unpublishUser, { id, sessionId, token });
    yield put(websocketConnectorUnpublishUserSuccess({ id, sessionId }));
  } catch (error) {
    yield put(websocketConnectorUnpublishUserFailure({ error }));
  }
}

/**
 * @description Saga for publishing action.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload Action payload.
 * @param {string} type Action type.
 */
function* onPublishAction({ payload, type }) {
  const index = yield select(getSelectWebsocketConnectorActionsCount());
  const sessionId = yield select(getSelectWebsocketConnectorId());
  try {
    const { id } = yield call(publishAction, {
      index,
      payload,
      sessionId,
      type,
    });
    yield put({ type: `${type}_PUBLISH_SUCCESS` });
    yield put(
      websocketConnectorPublishActionSuccess({
        id,
        index,
        payload,
        sessionId,
        type,
      }),
    );
  } catch (error) {
    yield put({ type: `${type}_PUBLISH_FAILURE`, payload: { error } });
    yield put(
      websocketConnectorPublishActionFailure({
        index,
        payload,
        sessionId,
        type,
      }),
    );
  }
}

/**
 * @description Saga for subscribing to receive session topic, hostname,
 * and livestream of connecting users.
 * @param {Object} action Nested object, containing type and payload keys.
 * @param {string} payload.id Session Id.
 */
function* onSubscribeToSession({ payload: { id } }) {
  try {
    const channel = yield call(subscribeToSession, { id });
    // Get session information on first take
    const { topic, hostUsername, timestamp } = yield take(channel);
    yield put(
      websocketConnectorSubscribeToSessionSuccess({
        topic,
        hostUsername,
        id,
        timestamp,
      }),
    );
    // Listen for follow up actions, like other users joining
    while (true) {
      const action = yield take(channel);
      yield put({
        type: `${action.type}_FROM_WEBSOCKET`,
        payload: action.payload,
      });
    }
  } catch (error) {
    yield put(websocketConnectorSubscribeToSessionFailure({ error }));
  }
}

/**
 * @description Saga for unsubscribing from a session.
 * @param {Object} action Nested object, containing type and payload keys.
 * @param {string} payload.id Session Id.
 * @param [string] payload.username Username of unsubscriber.
 */
function* onUnsubscribeSession({ payload: { id, username } }) {
  try {
    yield call(unsubscribeSession, {
      id,
      username,
    });
    yield put(websocketConnectorUnsubscribeSessionSuccess());
  } catch (error) {
    yield put(websocketConnectorUnsubscribeSessionFailure({ error }));
  }
}

/**
 * @description Saga subscribing to a session's actions.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id Session id to subscribe to.
 */
function* onSubscribeToSessionActions({ payload: { id } }) {
  try {
    const channel = yield call(subscribeToSessionActions, { id });
    yield put(websocketConnectorSubscribeToSessionActionsSuccess());
    while (true) {
      const { payload, timestamp, type } = yield take(channel);
      yield put({
        type: `${type}_FROM_WEBSOCKET`,
        payload,
      });
      yield put(
        websocketConnectorSessionActionReceived({
          id,
          payload,
          timestamp,
          type,
        }),
      );
    }
  } catch (error) {
    yield put(websocketConnectorSubscribeToSessionActionsFailure({ error }));
  }
}

/**
 * @description Saga subscribing to a session's users.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id Session id to subscribe to.
 */
function* onSubscribeToSessionUsers({ payload: { id } }) {
  try {
    const channel = yield call(subscribeToSessionUsers, { id });
    yield put(websocketConnectorSubscribeToSessionUsersSuccess());
    while (true) {
      const action = yield take(channel);
      yield put({
        type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FROM_WEBSOCKET,
        payload: action.payload,
      });
    }
  } catch (error) {
    yield put(websocketConnectorSubscribeToSessionUsersFailure({ error }));
  }
}
/**
 * Action types to publish and subscribe
 */

export default function* websocketConnectorSaga() {
  const isHost = yield select(makeSelectWebsocketConnectorValueOfKey('isHost'));

  // Conditional Actions
  if (isHost) yield takeEvery(CODE_EDITOR_ON_CHANGE, onPublishAction);
  if (isHost) yield takeEvery(TEXT_EDITOR_ON_CHANGE, onPublishAction);

  yield takeLatest(WEBSOCKET_CONNECTOR_PUBLISH_USER_SUCCESS, onPublishAction);

  // yield takeEvery(CHAT_BOX_ON_CHANGE, onPublishAction);
  yield takeLatest(WEBSOCKET_CONNECTOR_PUBLISH_SESSION, onPublishSession);
  yield takeLatest(WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS, onPublishUser);

  yield takeLatest(WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION, onUnpublishSession);
  // yield takeLatest(WEBSOCKET_CONNECTOR_PUBLISH_USER, onPublishUser);
  yield takeLatest(WEBSOCKET_CONNECTOR_UNPUBLISH_USER, onUnpublishUser);

  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
    onSubscribeToSession,
  );
  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  //   onPublishAction,
  // );
  yield takeLatest(
    WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION,
    onUnsubscribeSession,
  );
  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_SUCCESS,
  //   onPublishAction,
  // );

  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
    onSubscribeToSessionActions,
  );
  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS,
    onSubscribeToSessionUsers,
  );

  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS,
  //   onSubscribeToSessionActions,
  // );
  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS,
  //   onUnsubscribeSessionActions,
  // );
}
