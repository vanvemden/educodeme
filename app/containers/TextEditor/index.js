import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Editor, Container } from './components';
import { makeSelectTextEditor } from './selectors';
import { textEditorOnChange } from './actions';

export const TextEditor = ({
  isLoading,
  hasError,
  containerWidth,
  ...restProps
}) => {
  return (
    <Container width={containerWidth}>
      <Editor {...restProps} />
    </Container>
  );
};

TextEditor.propTypes = {
  hasError: T.bool.isRequired,
  isLoading: T.bool.isRequired,
  value: T.string.isRequired,
  onReset: T.func,
  onChange: T.func,
};

const mapStateToProps = createSelector(
  makeSelectTextEditor(),
  ({ value, height, width, theme, options }) => ({
    height,
    value,
    width,
    theme,
    options,
  }),
);

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(textEditorOnChange({ value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextEditor);
