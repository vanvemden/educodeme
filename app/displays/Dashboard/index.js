/*
 * Dashboard
 *
 * For hosting a session
 *
 */

import React, { useState } from 'react';

import CodeEditor from '../../containers/CodeEditor';
import Container from './Container';
import ContainerRow from './ContainerRow';
import DirectionButton from './DirectionButton';
import TextEditor from '../../containers/TextEditor';
import WebsocketConnector from '../../containers/WebsocketConnector';

export default function Dashboard() {
  const [flexDirection, setFlexDirection] = useState('row');
  const [containerWidth, setContainerWidth] = useState('50%');
  const handleDirection = () => {
    const newDirection = flexDirection === 'row' ? 'column' : 'row';
    const newWidth = containerWidth === '50%' ? '100%' : '50%';
    setFlexDirection(newDirection);
    setContainerWidth(newWidth);
  };

  return (
    <Container>
      <ContainerRow>
        <WebsocketConnector />
      </ContainerRow>
      <ContainerRow>
        <DirectionButton onClick={handleDirection} direction={flexDirection} />
      </ContainerRow>
      <ContainerRow flexdirection={flexDirection}>
        <TextEditor containerWidth={containerWidth} />
        <CodeEditor containerWidth={containerWidth} />
      </ContainerRow>
    </Container>
  );
}
