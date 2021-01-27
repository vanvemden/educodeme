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

const Wrapper = styled(List)``;

function BaseList({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

BaseList.defaultProps = {};

BaseList.propTypes = {
  children: T.any.isRequired,
};

export default BaseList;
