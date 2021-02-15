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
  websocketConnectorSessionActionReceived,
  websocketConnectorSubscribeToSessionActionsFailure,
  websocketConnectorSubscribeToSessionActionsSuccess,
  websocketConnectorSubscribeToSessionFailure,
  websocketConnectorSubscribeToSessionSuccess,
  websocketConnectorUnpublishSessionFailure,
  websocketConnectorUnpublishSessionSuccess,
  websocketConnectorUnsubscribeSessionFailure,
  websocketConnectorUnsubscribeSessionSuccess,
} from './actions';
import {
  publishAction,
  publishSession,
  subscribeToSession,
  subscribeToSessionActions,
  unpublishSession,
  unsubscribeSession,
  unsubscribeSessionActions,
} from './api';
import {
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS,
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
 * @description Start a live session.
 * @param (object) Payload
 *
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
 * @description Client subscribes to a session.
 */
function* onUnpublishSession({ payload }) {
  console.log('onUnpublishSession payload:', payload);
  const { id, token, username } = payload;
  try {
    const result = yield call(unpublishSession, {
      id,
      token,
      username,
    });
    console.log('result:', result);
    yield put(websocketConnectorUnpublishSessionSuccess());
  } catch (error) {
    yield put(websocketConnectorUnpublishSessionFailure({ error }));
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
function* onUnsubscribeSession({ payload }) {
  const { id, username } = payload;
  console.log('onUnsubscribeSession id/username:', id, username);
  try {
    const result = yield call(unsubscribeSession, {
      id,
      username,
    });
    console.log('result:', result);
    yield put(websocketConnectorUnsubscribeSessionSuccess());
  } catch (error) {
    yield put(websocketConnectorUnsubscribeSessionFailure({ error }));
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
 * @description Client subscribes to a session.
 */
function* onUnsubscribeSessionActions({ payload }) {
  console.log('onUnsubscribeSessionActions payload:', payload);
  const { id, username } = payload;
  try {
    const result = yield call(unsubscribeSessionActions, {
      id,
      username,
    });
    console.log('result:', result);
    yield put(websocketConnectorUnsubscribeSessionActionsSuccess());
  } catch (error) {
    yield put(websocketConnectorUnsubscribeSessionActionsFailure({ error }));
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
  yield takeLatest(WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION, onUnpublishSession);
  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
    onSubscribeToSession,
  );
  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
    onSubscribeToSessionActions,
  );
  yield takeLatest(
    WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION,
    onUnsubscribeSession,
  );
  yield takeLatest(
    WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS,
    onUnsubscribeSessionActions,
  );
}
