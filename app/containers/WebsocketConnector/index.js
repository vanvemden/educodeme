import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import {
  websocketConnectorGenerateId,
  websocketConnectorIdOnChange,
  websocketConnectorPublishSession,
  websocketConnectorSubscribeToSession,
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

function WebsocketConnector({
  handleGenerateId,
  handleIdOnChange,
  handlePublishSession,
  handleSubscribeToSession,
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

  useEffect(() => {
    subscribeToConnectionEvent(({ state: connectionState, port }) => {
      console.log('WebsocketConnector useEffect', connectionState, port);
    });
  });

  return (
    <Container>
      <ContainerRow>
        <TextField
          disabled={isConnected}
          id="username"
          label="Username"
          onChange={e => handleUsernameOnChange(e.target.value)}
          required
          value={username}
        />
        <TextField
          disabled={isConnected}
          id="id"
          label="Session ID"
          onChange={e => handleIdOnChange(e.target.value)}
          required
          value={id}
        />
        <SocketIdButton
          disabled={isConnected}
          onClick={() => handleGenerateId({ id: uuidv4() })}
        />
        <TextField
          disabled={!isHost}
          id="topic"
          label="Session Topic"
          onChange={e => handleTopicOnChange(e.target.value)}
          required
          value={topic}
        />
        {isConnected ? (
          <DisconnectButton
            disabled={!isConnected}
            label="STOP"
            onClick={() => handleDisconnect({ id, username })}
          />
        ) : (
          <Fragment>
            <ConnectButton
              disabled={isConnected}
              label="HOST"
              onClick={() => handlePublishSession({ id, topic, username })}
            />
            <ConnectButton
              disabled={isConnected}
              label="JOIN"
              onClick={() => handleSubscribeToSession({ id, username })}
            />
          </Fragment>
        )}
      </ContainerRow>
    </Container>
  );
}

WebsocketConnector.propTypes = {
  handleGenerateId: T.func.isRequired,
  handleIdOnChange: T.func.isRequired,
  handlePublishSession: T.func.isRequired,
  handleSubscribeToSession: T.func.isRequired,
  handleTopicOnChange: T.func.isRequired,
  handleUsernameOnChange: T.func.isRequired,
  id: T.string.isRequired,
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
  handleGenerateId: ({ id }) => dispatch(websocketConnectorGenerateId({ id })),
  handleIdOnChange: value => dispatch(websocketConnectorIdOnChange({ value })),
  handlePublishSession: ({ id, topic, username }) =>
    dispatch(websocketConnectorPublishSession({ id, topic, username })),
  handleSubscribeToSession: ({ id, username }) =>
    dispatch(websocketConnectorSubscribeToSession({ id, username })),
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
