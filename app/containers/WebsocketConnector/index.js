import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';
import { useParams } from 'react-router';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import {
  websocketConnectorGenerateId,
  websocketConnectorIdOnChange,
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
  SocketIdButton,
  TextField,
} from './components';
import reducer from './reducer';
import saga from './saga';
import { makeSelectWebsocketConnector } from './selectors';
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

  const { session_id } = useParams();
  const isValidTopic = topic => false;
  const isValidUsername = username => false;

  useEffect(() => {
    subscribeToConnectionEvent(({ state: connectionState, port }) => {
      console.log('WebsocketConnector ', connectionState, port);
      if (session_id) {
        // Join session
        if (isValidSessionId(session_id)) {
          handleSubscribeToSession({ id: session_id });
        } else {
          console.log('Error: invalid id');
        }
      } else {
        // Hosts session
        console.log('Host sesion');
      }
    });
  }, [session_id]);

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
                disabled={isConnected}
                label="HOST"
                onClick={() => handlePublishSession({ id, topic, username })}
              />
            ) : (
              <ConnectButton
                disabled={!isValidUsername}
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
  topic: T.string,
  username: T.string.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectWebsocketConnector(),
  ({ id, isConnected, isHost, topic, username }) => ({
    id,
    isConnected,
    isHost,
    topic,
    username,
  }),
);

const mapDispatchToProps = dispatch => ({
  handlePublishSession: ({ id, topic, username }) =>
    dispatch(websocketConnectorPublishSession({ id, topic, username })),
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
