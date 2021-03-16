import { call, put, select, take } from 'redux-saga/effects';

import {
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
  socketSubscriberUnsubscribeActionsFailure,
  socketSubscriberUnsubscribeActionsSuccess,
  socketSubscriberUnsubscribeUsersFailure,
  socketSubscriberUnsubscribeUsersSuccess,
} from '../actions';
import {
  publishUser,
  subscribeActions,
  subscribeSession,
  subscribeUsers,
  unpublishUser,
  unsubscribeActions,
  unsubscribeUsers,
} from '../api';
import {
  selectSocketSessionId,
  selectSocketUserId,
  selectSocketUsername,
  selectSocketUserToken,
} from '../selectors';

/**
 * @description Saga for publishing a user connecting to a session.
 */
export function* subscriberPublishUser() {
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
 * @description Saga to unpublish a user connected to a session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.userId
 * @param {string} payload.token
 * @param {string} payload.username
 */
export function* subscriberUnpublishUser() {
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
export function* subscriberSubscribeSession({ payload: { sessionId } }) {
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
// export function* subscriberUnsubscribeSession() {
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
export function* subscriberSubscribeActions() {
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
export function* subscriberSubscribeUsers() {
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

/**
 * @description Saga for unsubscribing from session actions feed.
 */
export function* subscriberUnsubscribeActions() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    yield call(unsubscribeActions, { sessionId });
    yield put(socketSubscriberUnsubscribeActionsSuccess());
  } catch (error) {
    yield put(socketSubscriberUnsubscribeActionsFailure({ error }));
  }
}

/**
 * @description Saga for unsubscribing from session users feed.
 */
export function* subscriberUnsubscribeUsers() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    yield call(unsubscribeUsers, { sessionId });
    yield put(socketSubscriberUnsubscribeUsersSuccess());
  } catch (error) {
    yield put(socketSubscriberUnsubscribeUsersFailure({ error }));
  }
}
