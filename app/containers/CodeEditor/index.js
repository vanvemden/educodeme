import React from 'react';

import Editor from 'components/Editor';
import StopButton from './components/StopButton';
import StartButton from './components/StartButton';

export function CodeEditor() {
  return (
    <div>
      <h1>This is the Code Editor</h1>
      <Editor />
      <StartButton label="START BUTTON" />
      <StopButton label="STOP BUTTON" />
    </div>
  );
}

export default CodeEditor;
