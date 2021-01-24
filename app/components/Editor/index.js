import React from 'react';
import PropTypes from 'prop-types';
import ControlledEditor from '@monaco-editor/react';

import { EditorWrapper } from './styles';

export function Editor({
  height = 100,
  language = 'javascript',
  theme = 'light',
  value = 'Code goes here',
  width = '100%',
}) {
  return (
    <EditorWrapper>
      <ControlledEditor
        height={height}
        language={language}
        theme={theme}
        value={value}
        width={width}
      />
    </EditorWrapper>
  );
}

Editor.propTypes = {
  height: PropTypes.number,
  language: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.number,
};

export default Editor;
