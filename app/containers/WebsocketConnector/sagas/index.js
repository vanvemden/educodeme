import { takeEvery, takeLatest } from 'redux-saga/effects';

import {
  publisherPublishAction,
  publisherPublishSession,
  publisherPublishUser,
  publisherSubscribeActions,
  publisherSubscribeUsers,
  publisherUnpublishSession,
  publisherUnpublishUser,
  publisherUnsubscribeActions,
} from './publisher';
import {
  subscriberSubscribeSession,
  subscriberSubscribeUsers,
  subscriberPublishUser,
  subscriberSubscribeActions,
  subscriberUnpublishUser,
  subscriberUnsubscribeActions,
} from './subscriber';
import {
  SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
  SOCKET_PUBLISHER_PUBLISH_SESSION,
  SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS,
  SOCKET_PUBLISHER_SUBSCRIBE_USERS_SUCCESS,
  SOCKET_PUBLISHER_UNPUBLISH_SESSION_SUCCESS,
  SOCKET_PUBLISHER_UNPUBLISH_SESSION,
  SOCKET_PUBLISHER_UNPUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_PUBLISH_USER,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER,
} from '../constants';
import { CODE_EDITOR_ON_CHANGE } from '../../CodeEditor/constants';
import { TEXT_EDITOR_ON_CHANGE } from '../../TextEditor/constants';

export default function* socketSagas() {
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
   * Publisher clicks Stop button
   */
  yield takeLatest(
    SOCKET_PUBLISHER_UNPUBLISH_SESSION,
    publisherUnpublishSession,
  );
  yield takeLatest(
    SOCKET_PUBLISHER_UNPUBLISH_SESSION_SUCCESS,
    publisherUnpublishUser,
  );
  yield takeLatest(
    SOCKET_PUBLISHER_UNPUBLISH_USER_SUCCESS,
    publisherUnsubscribeActions,
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
  yield takeLatest(
    SOCKET_SUBSCRIBER_UNPUBLISH_USER_SUCCESS,
    subscriberUnsubscribeActions,
  );
}
