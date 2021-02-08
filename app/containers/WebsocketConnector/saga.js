import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  websocketConnectorPublishSessionFailure,
  websocketConnectorPublishSessionSuccess,
  websocketConnectorSubscribeToSessionFailure,
  websocketConnectorSubscribeToSessionSuccess,
} from './actions';
import { publishAction, publishSession, subscribeToSession } from './api';
import {
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
} from './constants';
import { makeSelectWebsocketConnectorValueOfKey } from './selectors';

import { CODE_EDITOR_ON_CHANGE } from '../CodeEditor/constants';
import { TEXT_EDITOR_ON_CHANGE } from '../TextEditor/constants';

/**
 * Client publishes an action of a session.
 */
function* onPublishAction({ payload, type }) {
  const sessionId = yield select(makeSelectWebsocketConnectorValueOfKey('id'));
  try {
    yield call(publishAction, { payload, sessionId, type });
    yield put({ type: `${type}_PUBLISH_SUCCESS` });
  } catch (error) {
    yield put({ type: `${type}_PUBLISH_FAILURE` }, { error });
  }
}

/**
 * Client publishes a session, and receives session token.
 */
function* onPublishSession({ payload }) {
  const { id, topic, username } = payload;
  try {
    const { token } = yield call(publishSession, { id, topic, username });
    yield put(websocketConnectorPublishSessionSuccess({ token }));
  } catch (error) {
    yield put(websocketConnectorPublishSessionFailure({ error }));
  }
}

/**
 * Client subscribes to a session.
 */
function* onSubscribeToSession({ payload }) {
  const { id } = payload;
  try {
    yield call(subscribeToSession, { id }, action => {
      console.log('onSubscribeToSession action', action);
      put({ type: `${action.type}_FROM_WEBSOCKET` });
    });
    yield put(websocketConnectorSubscribeToSessionSuccess());
  } catch (error) {
    yield put(websocketConnectorSubscribeToSessionFailure({ error }));
  }
}

/**
 * Action types to publish and subscribe
 */
export default function* websocketConnectorSaga() {
  const isHost = yield select(makeSelectWebsocketConnectorValueOfKey('isHost'));
  if (isHost) yield takeEvery(CODE_EDITOR_ON_CHANGE, onPublishAction);
  if (isHost) yield takeEvery(TEXT_EDITOR_ON_CHANGE, onPublishAction);
  yield takeEvery(WEBSOCKET_CONNECTOR_PUBLISH_SESSION, onPublishSession);
  yield takeLatest(
    WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
    onSubscribeToSession,
  );
}
