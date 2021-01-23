import React from 'react';
import PropTypes from 'prop-types';
import ControlledEditor from '@monaco-editor/react';

export function Editor({
  height = 100,
  language = 'javascript',
  theme = 'light',
  value = 'Code goes here',
  width = 400,
}) {
  return (
    <ControlledEditor
      height={height}
      language={language}
      theme={theme}
      value={value}
      width={width}
    />
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
