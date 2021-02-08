import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import { codeEditorOnChange } from './actions';
import { Editor, Container, InputLabel } from './components';
import reducer from './reducer';
import { makeSelectCodeEditor } from './selectors';

import { Condition } from '../../components/Wrapper';

export const CodeEditor = ({
  containerWidth,
  hasError,
  isLoading,
  isSending,
  ...restProps
}) => {
  useInjectReducer({ key: 'codeEditor', reducer });

  return (
    <Container width={containerWidth}>
      <InputLabel>Code</InputLabel>
      <Editor {...restProps} />
      <Condition
        ifTrue={isSending}
        ComponentOnTrue={<InputLabel>sending</InputLabel>}
        ComponentOnFalse={<InputLabel>idle</InputLabel>}
      />
    </Container>
  );
};

CodeEditor.propTypes = {
  containerWidth: T.string.isRequired,
  hasError: T.bool,
  isLoading: T.bool,
  isSending: T.bool,
  onChange: T.func,
  onReset: T.func,
  value: T.string.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectCodeEditor(),
  ({ height, isLoading, isSending, options, theme, value }) => ({
    height,
    isSending,
    isLoading,
    options,
    theme,
    value,
  }),
);

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(codeEditorOnChange({ value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeEditor);
