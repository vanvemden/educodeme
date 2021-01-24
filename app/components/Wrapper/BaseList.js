/*
 * BaseList
 *
 * The base component of all List wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import List from '@material-ui/core/List';

import theme from '../../themes';

const StyledBaseList = styled(List)``;

function BaseList(props) {
  return <StyledBaseList>{props.children}</StyledBaseList>;
}

BaseList.defaultProps = {};

BaseList.propTypes = {
  children: T.any.isRequired,
};

export default BaseList;
