/*
 * HostCard
 *
 * For hosting a session
 *
 */

import React, { useState } from 'react';

import CodeEditor from '../../containers/CodeEditor';
import TextEditor from '../../containers/TextEditor';
import Container from './Container';
import ContainerRow from './ContainerRow';
import DirectionButton from './DirectionButton';

export default function HostCard() {
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
        <DirectionButton label="Toggle Direction" onClick={handleDirection} />
      </ContainerRow>
      <ContainerRow flexDirection={flexDirection}>
        <CodeEditor containerWidth={containerWidth} />
        <TextEditor containerWidth={containerWidth} />
      </ContainerRow>
    </Container>
  );
}
