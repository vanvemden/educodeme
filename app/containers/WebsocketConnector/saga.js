import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  websocketConnectorSessionActionReceived,
  websocketConnectorPublishActionFailure,
  websocketConnectorPublishActionSuccess,
  websocketConnectorPublishSessionFailure,
  websocketConnectorPublishSessionSuccess,
  websocketConnectorSubscribeToSessionFailure,
  websocketConnectorSubscribeToSessionSuccess,
  websocketConnectorSubscribeToSessionActionsFailure,
  websocketConnectorSubscribeToSessionActionsSuccess,
} from './actions';
import {
  publishAction,
  publishSession,
  subscribeToSession,
  subscribeToSessionActions,
} from './api';
import {
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
} from './constants';
import {
  getSelectWebsocketConnectorActionsCount,
  getSelectWebsocketConnectorId,
  makeSelectWebsocketConnectorValueOfKey,
} from './selectors';
import { CODE_EDITOR_ON_CHANGE } from '../CodeEditor/constants';
import { TEXT_EDITOR_ON_CHANGE } from '../TextEditor/constants';

/**
 * Client publishes a session, and receives session token.
 */
function* onPublishSession({ payload }) {
  const { topic, username } = payload;
  try {
    const { id, token, timestamp } = yield call(publishSession, {
      topic,
      username,
    });
    yield put(
      websocketConnectorPublishSessionSuccess({ id, token, timestamp }),
    );
  } catch (error) {
    yield put(websocketConnectorPublishSessionFailure({ error }));
  }
}

/**
 * Client publishes an action of a session.
 */
function* onPublishAction({ payload, type }) {
  const index = yield select(getSelectWebsocketConnectorActionsCount());
  const sessionId = yield select(getSelectWebsocketConnectorId());
  try {
    const result = yield call(publishAction, {
      index,
      payload,
      sessionId,
      type,
    });
    const id = result.cursor.generated_keys[0];
    // Handles each action type's successful publication
    yield put(
      websocketConnectorPublishActionSuccess({
        id,
        index,
        payload,
        sessionId,
        type,
      }),
    );
    // Handles this action type's successful publication
    yield put({ type: `${type}_PUBLISH_SUCCESS` });
  } catch (error) {
    // Handles each action type's failed publication
    yield put(
      websocketConnectorPublishActionFailure({
        index,
        payload,
        sessionId,
        type,
      }),
    );
    // Handles this action type's failed publication
    yield put({ type: `${type}_PUBLISH_FAILURE` }, { error });
  }
}

function* onSubscribeToSession({ payload }) {
  const { id } = payload;
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
 * @description Client subscribes to a session.
 */
function* onSubscribeToSessionActions({ payload }) {
  const { id } = payload;
  try {
    const channel = yield call(subscribeToSessionActions, { id });
    yield put(websocketConnectorSubscribeToSessionActionsSuccess());
    while (true) {
      const action = yield take(channel);
      yield put({
        type: `${action.type}_FROM_WEBSOCKET`,
        payload: action.payload,
      });
      yield put(websocketConnectorSessionActionReceived({ action }));
    }
  } catch (error) {
    yield put(websocketConnectorSubscribeToSessionActionsFailure({ error }));
  }
}

/**
 * Action types to publish and subscribe
 */
export default function* websocketConnectorSaga() {
  const isHost = yield select(makeSelectWebsocketConnectorValueOfKey('isHost'));
  if (isHost) yield takeEvery(CODE_EDITOR_ON_CHANGE, onPublishAction);
  if (isHost) yield takeEvery(TEXT_EDITOR_ON_CHANGE, onPublishAction);
  // yield takeEvery(CHAT_BOX_ON_CHANGE, onPublishAction);
  yield takeLatest(WEBSOCKET_CONNECTOR_PUBLISH_SESSION, onPublishSession);
  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
    onSubscribeToSession,
  );
  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
    onSubscribeToSessionActions,
  );
}
