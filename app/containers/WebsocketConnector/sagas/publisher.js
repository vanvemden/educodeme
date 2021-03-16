import { call, put, select, take } from 'redux-saga/effects';

import {
  socketPublisherPublishActionFailure,
  socketPublisherPublishActionSuccess,
  socketPublisherPublishSessionFailure,
  socketPublisherPublishSessionSuccess,
  socketPublisherPublishUserFailure,
  socketPublisherPublishUserSuccess,
  socketPublisherReceiveAction,
  socketPublisherReceiveUser,
  socketPublisherSubscribeActionsFailure,
  socketPublisherSubscribeActionsSuccess,
  socketPublisherSubscribeUsersFailure,
  socketPublisherSubscribeUsersSuccess,
  socketPublisherUnpublishSessionFailure,
  socketPublisherUnpublishSessionSuccess,
  socketPublisherUnpublishUserFailure,
  socketPublisherUnpublishUserSuccess,
  socketPublisherUnsubscribeActionsFailure,
  socketPublisherUnsubscribeActionsSuccess,
  socketPublisherUnsubscribeUsersFailure,
  socketPublisherUnsubscribeUsersSuccess,
} from '../actions';
import {
  publishAction,
  publishSession,
  publishUser,
  subscribeActions,
  subscribeUsers,
  unpublishSession,
  unpublishUser,
  unsubscribeActions,
  unsubscribeUsers,
} from '../api';
import {
  selectSocketActionsCount,
  selectSocketSessionId,
  selectSocketSessionToken,
  selectSocketSessionTopic,
  selectSocketUserId,
  selectSocketUsername,
  selectSocketUserToken,
} from '../selectors';

/**
 * @description Saga to start livestream session.
 */
export function* publisherPublishSession() {
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
export function* publisherUnpublishSession() {
  const sessionId = yield select(selectSocketSessionId());
  const sessionToken = yield select(selectSocketSessionToken());
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
export function* publisherPublishUser() {
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
export function* publisherPublishAction({ payload, type }) {
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
export function* publisherSubscribeActions() {
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
 * @description Saga to unpublish a user connected to a session.
 * @param {Object} action Nested action object, containing type and payload keys.
 * @param {string} payload.userId
 * @param {string} payload.token
 * @param {string} payload.username
 */
export function* publisherUnpublishUser() {
  const sessionId = yield select(selectSocketSessionId());
  const userId = yield select(selectSocketUserId());
  const userToken = yield select(selectSocketUserToken());
  try {
    yield call(unpublishUser, { sessionId, userToken, userId });
    yield put(socketPublisherUnpublishUserSuccess());
  } catch (error) {
    yield put(socketPublisherUnpublishUserFailure({ error }));
  }
}

/**
 * @description Saga for unsubscribing from session actions feed.
 */
export function* publisherUnsubscribeActions() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    yield call(unsubscribeActions, { sessionId });
    yield put(socketPublisherUnsubscribeActionsSuccess());
  } catch (error) {
    yield put(socketPublisherUnsubscribeActionsFailure({ error }));
  }
}

/**
 * @description Saga for unsubscribing from session users feed.
 */
export function* publisherUnsubscribeUsers() {
  const sessionId = yield select(selectSocketSessionId());
  try {
    yield call(unsubscribeUsers, { sessionId });
    yield put(socketPublisherUnsubscribeUsersSuccess());
  } catch (error) {
    yield put(socketPublisherUnsubscribeUsersFailure({ error }));
  }
}

/**
 * @description Saga subscribing to a session's users.
 */
export function* publisherSubscribeUsers() {
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
