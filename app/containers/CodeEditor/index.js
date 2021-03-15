import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import { codeEditorOnChange } from './actions';
import { Editor, ConnectionSignal, Container, InputLabel } from './components';
import reducer from './reducer';
import { makeSelectCodeEditorValueOfKey } from './selectors';
import {
  selectSocketIsConnected,
  selectSocketIsHost,
} from '../WebsocketConnector/selectors';

export const CodeEditor = ({
  containerWidth,
  hasError,
  isConnected,
  isHost,
  isLoading,
  isReceiving,
  isSending,
  ...restProps
}) => {
  useInjectReducer({ key: 'codeEditor', reducer });

  return (
    <Container width={containerWidth}>
      <InputLabel>
        Code
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

CodeEditor.propTypes = {
  containerWidth: T.string.isRequired,
  hasError: T.bool,
  isConnected: T.bool,
  isHost: T.bool,
  isLoading: T.bool,
  isReceiving: T.bool,
  isSending: T.bool,
  onChange: T.func,
  onReset: T.func,
  options: T.object,
  value: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  height: makeSelectCodeEditorValueOfKey('height'),
  isConnected: selectSocketIsConnected(),
  isHost: selectSocketIsHost(),
  isLoading: makeSelectCodeEditorValueOfKey('isLoading'),
  isReceiving: makeSelectCodeEditorValueOfKey('isReceiving'),
  isSending: makeSelectCodeEditorValueOfKey('isSending'),
  options: makeSelectCodeEditorValueOfKey('options'),
  value: makeSelectCodeEditorValueOfKey('value'),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(codeEditorOnChange({ value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeEditor);
