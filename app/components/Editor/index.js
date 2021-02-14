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
  value: PropTypes.string.isRequired,
};

export default Editor;
