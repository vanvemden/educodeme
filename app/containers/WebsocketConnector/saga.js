import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  /** Publisher actions */
  socketPublisherPublishActionFailure,
  socketPublisherPublishActionSuccess,
  socketPublisherPublishSessionFailure,
  socketPublisherPublishSessionSuccess,
  socketPublisherPublishUserFailure,
  socketPublisherPublishUserSuccess,
  socketPublisherReceiveAction,
  socketPublisherReceiveUser,
  socketPublisherSubscribeActions,
  socketPublisherSubscribeActionsSuccess,
  socketPublisherSubscribeActionsFailure,
  socketPublisherSubscribeUsersFailure,
  socketPublisherSubscribeUsersSuccess,
  /** Subscriber actions */
  socketSubscriberPublishUserFailure,
  socketSubscriberPublishUserSuccess,
  socketSubscriberReceiveSession,
  socketSubscriberReceiveUser,
  socketSubscriberSubscribeActionsFailure,
  socketSubscriberSubscribeActionsSuccess,
  socketSubscriberSubscribeSessionFailure,
  socketSubscriberSubscribeSessionSuccess,
  socketSubscriberSubscribeUsersFailure,
  socketSubscriberSubscribeUsersSuccess,
  socketSubscriberUnpublishUserFailure,
  socketSubscriberUnpublishUserSuccess,
} from './actions/index';
import {
  publishAction,
  publishSession,
  publishUser,
  subscribeSession,
  subscribeActions,
  subscribeUsers,
  unpublishSession,
  unpublishUser,
} from './api';
import {
  SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
  SOCKET_PUBLISHER_PUBLISH_SESSION,
  SOCKET_PUBLISHER_SUBSCRIBE_USERS_SUCCESS,
  SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_PUBLISH_USER,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER,
  SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS,
} from './constants';
import {
  selectSocketActionsCount,
  selectSocketSessionId,
  selectSocketSessionTopic,
  selectSocketUserId,
  selectSocketUsername,
  selectSocketUserToken,
} from './selectors';
import { CODE_EDITOR_ON_CHANGE } from '../CodeEditor/constants';
import { TEXT_EDITOR_ON_CHANGE } from '../TextEditor/constants';

/**
 * @description Saga to start livestream session.
 */
function* publisherPublishSession() {
  /** select session data from store */
  const sessionTopic = yield select(selectSocketSessionTopic());
  const username = yield select(selectSocketUsername());
  try {
    /** api call to store session in db */
    const {
      sessionId,
      sessionTimestamp,
      sessionToken,
      sessionUsername,
    } = yield call(publishSession, {
      sessionTopic,
      username,
    });
    /** update store with db data */
    yield put(
      socketPublisherPublishSessionSuccess({
        sessionId,
        sessionTimestamp,
        sessionToken,
        sessionTopic,
        sessionUsername,
      }),
    );
  } catch (error) {
    /** handle error */
    yield put(socketPublisherPublishSessionFailure({ error }));
  }
}

/**
 * @description Saga to unpublish session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id Session id.
 * @param {string} payload.token Session token.
 */
function* publisherUnpublishSession({ payload: { sessionId, sessionToken } }) {
  try {
    yield call(unpublishSession, {
      sessionId,
      sessionToken,
    });
    yield put(socketPublisherUnpublishSessionSuccess({ sessionId }));
  } catch (error) {
    yield put(socketPublisherUnpublishSessionFailure({ error }));
  }
}

/**
 * @description Saga for publishing a user connecting to a session.
 */
function* publisherPublishUser() {
  const sessionId = yield select(selectSocketSessionId());
  const username = yield select(selectSocketUsername());
  try {
    const { userId, userToken } = yield call(publishUser, {
      sessionId,
      username,
    });
    yield put(
      socketPublisherPublishUserSuccess({
        userId,
        userToken,
      }),
    );
  } catch (error) {
    yield put(socketPublisherPublishUserFailure({ error }));
  }
}

/**
 * @description Saga for publishing action.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload Action payload.
 * @param {string} type Action type.
 */
function* publisherPublishAction({ payload, type }) {
  const index = yield select(selectSocketActionsCount());
  const sessionId = yield select(selectSocketSessionId());
  try {
    const { actionId } = yield call(publishAction, {
      index,
      payload,
      sessionId,
      type,
    });
    // yield put({ type: `${type}_PUBLISH_SUCCESS` });
    yield put(
      socketPublisherPublishActionSuccess({
        actionId,
        index,
        payload,
        type,
      }),
    );
  } catch (error) {
    // yield put({ type: `${type}_PUBLISH_FAILURE`, payload: { error } });
    yield put(socketPublisherPublishActionFailure({ error }));
  }
}

/**
 * @description Saga subscribing to a session's actions.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id Session id to subscribe to.
 */
function* publisherSubscribeActions() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    const channel = yield call(subscribeActions, { sessionId });
    yield put(socketPublisherSubscribeActionsSuccess());
    while (true) {
      const { payload, type } = yield take(channel);
      yield put(socketPublisherReceiveAction({ payload, type }));
    }
  } catch (error) {
    yield put(socketPublisherSubscribeActionsFailure({ error }));
  }
}

/**
 * @description Saga for publishing a user connecting to a session.
 */
function* subscriberPublishUser() {
  const sessionId = yield select(selectSocketSessionId());
  const username = yield select(selectSocketUsername());
  try {
    const { userId, userToken } = yield call(publishUser, {
      sessionId,
      username,
    });
    yield put(
      socketSubscriberPublishUserSuccess({
        userId,
        userToken,
      }),
    );
  } catch (error) {
    yield put(socketSubscriberPublishUserFailure({ error }));
  }
}

/**
 * @description Saga for unpublishing a user connected to a session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.userId
 * @param {string} payload.token
 * @param {string} payload.username
 */
function* subscriberUnpublishUser() {
  const sessionId = yield select(selectSocketSessionId());
  const userId = yield select(selectSocketUserId());
  const userToken = yield select(selectSocketUserToken());
  try {
    yield call(unpublishUser, { sessionId, userToken, userId });
    yield put(socketSubscriberUnpublishUserSuccess());
  } catch (error) {
    yield put(socketSubscriberUnpublishUserFailure({ error }));
  }
}

/**
 * @description Saga for subscribing to livestream session.
 */
function* subscriberSubscribeSession({ payload: { sessionId } }) {
  try {
    const channel = yield call(subscribeSession, { sessionId });
    const {
      sessionIsLivestream,
      sessionTimestamp,
      sessionTopic,
      sessionUsername,
    } = yield take(channel);
    yield put(
      socketSubscriberSubscribeSessionSuccess({
        sessionId,
        sessionIsLivestream,
        sessionTimestamp,
        sessionTopic,
        sessionUsername,
      }),
    );
    while (true) {
      // eslint-disable-next-line no-shadow
      const { sessionIsLivestream, sessionTopic } = yield take(channel);
      yield put(
        socketSubscriberReceiveSession({
          sessionIsLivestream,
          sessionTopic,
        }),
      );
    }
  } catch (error) {
    yield put(socketSubscriberSubscribeSessionFailure({ error }));
  }
}

/**
 * @description Saga for unsubscribing from a session.
 */
// function* subscriberUnsubscribeSession() {
//   const sessionId = yield select(selectSocketSessionId());
//   const userId = yield select(selectSocketUserId());
//   const userToken = yield select(selectSocketUserToken());
//   try {
//     yield call(unsubscribeSession, {
//       sessionId,
//       userId,
//       userToken,
//     });
//     yield put(socketSubscriberUnsubscribeSessionSuccess({ sessionId }));
//   } catch (error) {
//     yield put(socketSubscriberUnsubscribeSessionFailure({ error }));
//   }
// }

/**
 * @description Saga subscribing to a session's actions.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.id Session id to subscribe to.
 */
function* subscriberSubscribeActions() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    const channel = yield call(subscribeActions, { sessionId });
    yield put(socketSubscriberSubscribeActionsSuccess());
    while (true) {
      const { payload, type } = yield take(channel);
      yield put({
        type: `${type}_FROM_SOCKET`,
        payload,
      });
    }
  } catch (error) {
    yield put(socketSubscriberSubscribeActionsFailure({ error }));
  }
}

/**
 * @description Saga subscribing to a session's users.
 */
function* publisherSubscribeUsers() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    const channel = yield call(subscribeUsers, { sessionId });
    yield put(socketPublisherSubscribeUsersSuccess());
    while (true) {
      const { change, username } = yield take(channel);
      yield put(
        socketPublisherReceiveUser({
          change,
          username,
        }),
      );
    }
  } catch (error) {
    yield put(
      socketPublisherSubscribeUsersFailure({
        error,
      }),
    );
  }
}

/**
 * @description Saga subscribing to a session's users.
 */
function* subscriberSubscribeUsers() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    const channel = yield call(subscribeUsers, { sessionId });
    yield put(socketSubscriberSubscribeUsersSuccess());
    while (true) {
      const { change, username } = yield take(channel);
      yield put(
        socketSubscriberReceiveUser({
          change,
          username,
        }),
      );
    }
  } catch (error) {
    yield put(
      socketSubscriberSubscribeUsersFailure({
        error,
      }),
    );
  }
}

export default function* websocketConnectorSaga() {
  yield takeEvery(CODE_EDITOR_ON_CHANGE, publisherPublishAction);
  yield takeEvery(TEXT_EDITOR_ON_CHANGE, publisherPublishAction);

  /**
   * Publisher clicks Host button
   */
  yield takeLatest(SOCKET_PUBLISHER_PUBLISH_SESSION, publisherPublishSession);
  yield takeLatest(
    SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
    publisherSubscribeUsers,
  );
  yield takeLatest(
    SOCKET_PUBLISHER_SUBSCRIBE_USERS_SUCCESS,
    publisherPublishUser,
  );
  yield takeLatest(
    SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS,
    publisherSubscribeActions,
  );

  /**
   * Subscriber opens session url
   */
  yield takeLatest(
    SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION,
    subscriberSubscribeSession,
  );
  yield takeLatest(
    SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS,
    subscriberSubscribeUsers,
  );

  /**
   * Subscriber clicks Join button
   */
  yield takeLatest(SOCKET_SUBSCRIBER_PUBLISH_USER, subscriberPublishUser);
  yield takeLatest(
    SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS,
    subscriberSubscribeActions,
  );

  /**
   * Subscriber clicks Stop button
   */
  yield takeLatest(SOCKET_SUBSCRIBER_UNPUBLISH_USER, subscriberUnpublishUser);

  /**  on publish session success, subscribe to session users  */
  // yield takeLatest(
  //   SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
  //   subscriberSubscribeUsers,
  // );
  /** if host: on subscribe to session success, publish user */
  // if (yield select(getSelectWebsocketConnectorIsHost())) {
  //   yield takeLatest(
  //     WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_SUCCESS,
  //     subscriberPublishUser,
  //   );
  // }
  /** start subscribe to session flow. */
  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  //   subscriberSubscribeSession,;
  // );
  /** on subscribe to session success, subscribe to session users */
  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  //   subscriberSubscribeUsers,
  // );

  /** if join: on button click, publish user */
  // yield takeLatest(WEBSOCKET_CONNECTOR_PUBLISH_USER, subscriberPublishUser);

  /** on publish user success, subscribe to session actions */
  // yield takeLatest(
  //   WEBSOCKET_CONNECTOR_PUBLISH_USER_SUCCESS,
  //   subscriberSubscribeSessionA;
  // );
}
