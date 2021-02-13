import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import { textEditorOnChange } from './actions';
import { Editor, ConnectionSignal, Container, InputLabel } from './components';
import reducer from './reducer';
import { makeSelectTextEditorValueOfKey } from './selectors';
import { makeSelectWebsocketConnectorValueOfKey } from '../WebsocketConnector/selectors';

export const TextEditor = ({
  containerWidth,
  hasError,
  isConnected,
  isHost,
  isLoading,
  isReceiving,
  isSending,
  ...restProps
}) => {
  useInjectReducer({ key: 'textEditor', reducer });

  return (
    <Container width={containerWidth}>
      <InputLabel>
        Text
        <ConnectionSignal
          isConnected={isConnected}
          isHost={isHost}
          isReceiving={isReceiving}
          isSending={isSending}
        />
      </InputLabel>
      <Editor {...restProps} />
    </Container>
  );
};

TextEditor.propTypes = {
  containerWidth: T.string.isRequired,
  hasError: T.bool,
  isConnected: T.bool,
  isHost: T.bool,
  isLoading: T.bool,
  isReceiving: T.bool,
  isSending: T.bool,
  onChange: T.func.isRequired,
  onReset: T.func,
  value: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  height: makeSelectTextEditorValueOfKey('height'),
  isConnected: makeSelectWebsocketConnectorValueOfKey('isConnected'),
  isHost: makeSelectWebsocketConnectorValueOfKey('isHost'),
  isLoading: makeSelectTextEditorValueOfKey('isLoading'),
  isReceiving: makeSelectTextEditorValueOfKey('isReceiving'),
  isSending: makeSelectTextEditorValueOfKey('isSending'),
  value: makeSelectTextEditorValueOfKey('value'),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(textEditorOnChange({ value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextEditor);
