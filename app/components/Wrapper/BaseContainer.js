/*
 * BaseContainer
 *
 * The base component of all Container wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import theme from '../../themes';

const Wrapper = styled(Container)`
  padding: 0.25rem;
`;

function BaseContainer({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

BaseContainer.defaultProps = {};

BaseContainer.propTypes = {
  children: T.any.isRequired,
};

export default BaseContainer;
