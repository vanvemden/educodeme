/*
 * BaseContainerRow
 *
 * The base component of all ContainerRow wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import theme from '../../themes';

const Wrapper = styled(Container)`
  padding: 0.5rem 0;
`;

function BaseContainerRow({ children, className }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

BaseContainerRow.defaultProps = {};

BaseContainerRow.propTypes = {};

export default BaseContainerRow;
