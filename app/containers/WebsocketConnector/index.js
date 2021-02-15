import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import {
  websocketConnectorPublishSession,
  websocketConnectorSubscribeToSession,
  websocketConnectorSubscribeToSessionActions,
  websocketConnectorTopicOnChange,
  websocketConnectorUsernameOnChange,
} from './actions';
import { subscribeToConnectionEvent } from './api';
import {
  ConnectButton,
  Container,
  ContainerRow,
  DisconnectButton,
  TextField,
} from './components';
import reducer from './reducer';
import saga from './saga';
import { makeSelectWebsocketConnectorValueOfKey } from './selectors';
import { isValidSessionId } from '../../utils/helpers';

function WebsocketConnector({
  handlePublishSession,
  handleSubscribeToSession,
  handleSubscribeToSessionActions,
  handleTopicOnChange,
  handleUsernameOnChange,
  id,
  isConnected,
  isHost,
  topic,
  username,
}) {
  useInjectReducer({ key: 'websocketConnector', reducer });
  useInjectSaga({ key: 'websocketConnector', saga });

  const [isFormInputValid, setIsFormInputValid] = useState(false);
  const { session_id } = useParams();

  useEffect(() => {
    subscribeToConnectionEvent(({ state: connectionState, port }) => {
      console.log('WebsocketConnector ', connectionState, port);
      if (session_id) {
        // Join session
        if (isValidSessionId(session_id)) {
          // subscribe to the session info, and connecting users
          handleSubscribeToSession({ id: session_id });
        } else {
          console.log('Error: invalid id');
        }
      } else {
        // Hosts session
        console.log('Host session');
      }
    });
  }, [session_id]);

  // Form input validation
  useEffect(() => {
    // TODO: check if username is unique
    setIsFormInputValid(topic !== '' && username !== '');
  }, [setIsFormInputValid, topic, username]);

  return (
    <Container>
      <ContainerRow>
        <TextField
          disabled={!isHost}
          id="topic"
          label="Session Topic"
          onChange={e => handleTopicOnChange(e.target.value)}
          required
          value={topic}
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
            onClick={() => handleDisconnect({ id, username })}
          />
        ) : (
          <Fragment>
            {isHost ? (
              <ConnectButton
                disabled={!isFormInputValid}
                label="HOST"
                onClick={() => handlePublishSession({ topic, username })}
              />
            ) : (
              <ConnectButton
                disabled={!isFormInputValid}
                label="JOIN"
                onClick={() =>
                  handleSubscribeToSessionActions({ id, username })
                }
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
  handleSubscribeToSession: T.func.isRequired,
  handleSubscribeToSessionActions: T.func.isRequired,
  handleTopicOnChange: T.func.isRequired,
  handleUsernameOnChange: T.func.isRequired,
  id: T.string,
  isConnected: T.bool.isRequired,
  isHost: T.bool.isRequired,
  isLoading: T.bool.isRequired,
  topic: T.string,
  username: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  id: makeSelectWebsocketConnectorValueOfKey('id'),
  isConnected: makeSelectWebsocketConnectorValueOfKey('isConnected'),
  isHost: makeSelectWebsocketConnectorValueOfKey('isHost'),
  isLoading: makeSelectWebsocketConnectorValueOfKey('isLoading'),
  topic: makeSelectWebsocketConnectorValueOfKey('topic'),
  username: makeSelectWebsocketConnectorValueOfKey('username'),
});

const mapDispatchToProps = dispatch => ({
  handlePublishSession: ({ topic, username }) =>
    dispatch(websocketConnectorPublishSession({ topic, username })),
  handleSubscribeToSession: ({ id }) =>
    dispatch(websocketConnectorSubscribeToSession({ id })),
  handleSubscribeToSessionActions: ({ id, username }) =>
    dispatch(websocketConnectorSubscribeToSessionActions({ id, username })),
  handleTopicOnChange: value =>
    dispatch(websocketConnectorTopicOnChange({ value })),
  handleUsernameOnChange: value =>
    dispatch(websocketConnectorUsernameOnChange({ value })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WebsocketConnector);
