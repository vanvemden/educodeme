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

const StyledBaseContainerRow = styled(Container)``;

function BaseContainerRow(props) {
  return <StyledBaseContainerRow>{props.children}</StyledBaseContainerRow>;
}

BaseContainerRow.defaultProps = {};

BaseContainerRow.propTypes = {};

export default BaseContainerRow;
