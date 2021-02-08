import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import { textEditorOnChange } from './actions';
import { Editor, Container, InputLabel } from './components';
import reducer from './reducer';
import { makeSelectTextEditor } from './selectors';

import { Condition } from '../../components/Wrapper';

export const TextEditor = ({
  containerWidth,
  hasError,
  isLoading,
  isSending,
  ...restProps
}) => {
  useInjectReducer({ key: 'textEditor', reducer });

  return (
    <Container width={containerWidth}>
      <InputLabel>Text</InputLabel>
      <Editor {...restProps} />
      <Condition
        ifTrue={isSending}
        ComponentOnTrue={<InputLabel>sending</InputLabel>}
        ComponentOnFalse={<InputLabel>idle</InputLabel>}
      />
    </Container>
  );
};

TextEditor.propTypes = {
  containerWidth: T.string.isRequired,
  hasError: T.bool,
  isLoading: T.bool,
  isSending: T.bool,
  onChange: T.func.isRequired,
  onReset: T.func,
  value: T.string.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectTextEditor(),
  ({ height, isLoading, isSending, options, theme, value }) => ({
    height,
    isLoading,
    isSending,
    options,
    theme,
    value,
  }),
);

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(textEditorOnChange({ value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextEditor);
