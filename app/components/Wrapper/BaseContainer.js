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

const StyledBaseContainer = styled(Container)``;

function BaseContainer(props) {
  return <StyledBaseContainer>{props.children}</StyledBaseContainer>;
}

BaseContainer.defaultProps = {};

BaseContainer.propTypes = {
  children: T.any.isRequired,
};

export default BaseContainer;
