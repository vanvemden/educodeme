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

const Wrapper = styled(Container)``;

function BaseContainer(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

BaseContainer.defaultProps = {};

BaseContainer.propTypes = {
  children: T.any.isRequired,
};

export default BaseContainer;
