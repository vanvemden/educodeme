import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import ControlledEditor from '@monaco-editor/react';

import { EditorWrapper } from './styles';
export function Editor({ value, ...restProps }) {
  return (
    <EditorWrapper>
      <ControlledEditor value={value} {...restProps} />
    </EditorWrapper>
  );
}

Editor.propTypes = {
  height: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.string.isRequired,
  width: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Editor;
