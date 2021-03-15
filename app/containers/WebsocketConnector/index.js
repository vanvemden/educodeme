import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  socketPublisherPublishSession,
  socketSubscriberSubscribeSession,
  socketSessionTopicOnChange,
  socketSessionUsernameOnChange,
  socketSubscriberPublishUser,
  socketSubscriberUnpublishUser,
} from './actions/';
import { subscribeConnectionEvent } from './api';
import {
  ConnectButton,
  Container,
  ContainerRow,
  DisconnectButton,
  TextField,
} from './components';
import reducer from './reducer';
import saga from './saga';
import {
  selectSocketIsConnected,
  selectSocketIsHost,
  selectSocketSessionId,
  selectSocketSessionTopic,
  selectSocketUsername,
  selectSocketValueOfKey,
} from './selectors';
import { isValidSessionId } from '../../utils/helpers';

function WebsocketConnector({
  handlePublishSession,
  handlePublishUser,
  handleSubscribeSession,
  handleTopicOnChange,
  handleUnpublishSession,
  handleUnpublishUser,
  handleUsernameOnChange,
  sessionId,
  isConnected,
  isHost,
  sessionToken,
  sessionTopic,
  username,
}) {
  useInjectReducer({ key: 'socket', reducer });
  useInjectSaga({ key: 'socket', saga });

  const [isFormInputValid, setIsFormInputValid] = useState(false);
  const { session_id } = useParams();

  useEffect(() => {
    subscribeConnectionEvent(({ state: connectionState, port }) => {
      console.log('socket ', connectionState, port);
      if (session_id) {
        // Join session
        if (isValidSessionId(session_id)) {
          handleSubscribeSession({ sessionId: session_id });
        } else {
          console.log('Error: invalid id');
        }
      } else {
        // Host session
      }
    });
  }, [session_id]);

  // Form input validation
  useEffect(() => {
    // TODO: check if username is unique
    setIsFormInputValid(sessionTopic !== '' && username !== '');
  }, [setIsFormInputValid, sessionTopic, username]);

  return (
    <Container>
      <ContainerRow>
        <TextField
          disabled={!isHost}
          id="session-topic"
          label="Session Topic"
          onChange={e => handleTopicOnChange(e.target.value)}
          required
          value={sessionTopic}
        />
        <TextField
          disabled={isConnected}
          id="username"
          label="Username"
          onChange={e => handleUsernameOnChange(e.target.value)}
          required
          value={username}
        />
        {isConnected ? (
          <DisconnectButton
            disabled={!isConnected}
            label="STOP"
            onClick={() =>
              isHost ? handleUnpublishSession() : handleUnpublishUser()
            }
          />
        ) : (
          <Fragment>
            {isHost ? (
              <ConnectButton
                disabled={!isFormInputValid}
                label="HOST"
                onClick={() => handlePublishSession()}
              />
            ) : (
              <ConnectButton
                disabled={!isFormInputValid}
                label="JOIN"
                onClick={() => handlePublishUser()}
              />
            )}
          </Fragment>
        )}
      </ContainerRow>
    </Container>
  );
}

WebsocketConnector.propTypes = {
  handlePublishSession: T.func.isRequired,
  handlePublishUser: T.func.isRequired,
  handleSubscribeSession: T.func.isRequired,
  // handleSubscribeSessionActions: T.func.isRequired,
  handleTopicOnChange: T.func.isRequired,
  // handleUnpublishSession: T.func.isRequired,
  handleUnpublishUser: T.func.isRequired,
  handleUsernameOnChange: T.func.isRequired,
  sessionId: T.string,
  isConnected: T.bool.isRequired,
  isHost: T.bool.isRequired,
  isLoading: T.bool.isRequired,
  sessionToken: T.string.isRequired,
  sessionTopic: T.string,
  username: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sessionId: selectSocketSessionId(),
  isConnected: selectSocketIsConnected(),
  isHost: selectSocketIsHost(),
  isLoading: selectSocketValueOfKey('isLoading'),
  sessionToken: selectSocketValueOfKey('sessionToken'),
  sessionTopic: selectSocketSessionTopic(),
  username: selectSocketUsername(),
});

const mapDispatchToProps = dispatch => ({
  handleTopicOnChange: value => dispatch(socketSessionTopicOnChange({ value })),
  handleUsernameOnChange: value =>
    dispatch(socketSessionUsernameOnChange({ value })),
  handlePublishSession: () => dispatch(socketPublisherPublishSession()),
  handlePublishUser: () => dispatch(socketSubscriberPublishUser()),
  handleSubscribeSession: ({ sessionId }) =>
    dispatch(socketSubscriberSubscribeSession({ sessionId })),
  handleUnpublishUser: () => dispatch(socketSubscriberUnpublishUser()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WebsocketConnector);
