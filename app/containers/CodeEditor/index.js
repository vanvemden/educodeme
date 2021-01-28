import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { codeEditorOnChange } from './actions';
import { Editor, Container } from './components';
import { makeSelectCodeEditor } from './selectors';

export const CodeEditor = ({
  containerWidth,
  hasError,
  isLoading,
  ...restProps
}) => {
  return (
    <Container width={containerWidth}>
      <Editor {...restProps} />
    </Container>
  );
};

CodeEditor.propTypes = {
  containerWidth: T.string.isRequired,
  hasError: T.bool,
  isLoading: T.bool.isRequired,
  onChange: T.func,
  onReset: T.func,
  value: T.string.isRequired,
  width: T.string,
};

const mapStateToProps = createSelector(
  makeSelectCodeEditor(),
  ({ value, height, width, theme, options }) => ({
    height,
    options,
    theme,
    value,
    width,
  }),
);

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(codeEditorOnChange({ value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeEditor);
