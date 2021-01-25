import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Editor, ResetButton, StartButton, StopButton } from './components';
import { makeSelectCodeEditor } from './selectors';
import { codeEditorReset } from './actions';

export const CodeEditor = ({
  dispatchReset,
  isLoading,
  hasError,
  ...restProps
}) => {
  const handleReset = () => {
    dispatchReset();
  };

  return (
    <Fragment>
      <Editor {...restProps} />
      <StartButton label="PRIMARY BUTTON" />
      <StopButton label="SECONDARY BUTTON" />
      <ResetButton label="RESET BUTTON" onClick={handleReset} />
    </Fragment>
  );
};

CodeEditor.propTypes = {
  hasError: T.bool.isRequired,
  isLoading: T.bool.isRequired,
  value: T.string.isRequired,
  dispatchReset: T.func,
};

const mapStateToProps = createSelector(
  makeSelectCodeEditor(),
  value => ({
    value,
  }),
);

const mapDispatchToProps = dispatch => ({
  dispatchReset: () => dispatch(codeEditorReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeEditor);
