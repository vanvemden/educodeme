/*
 * BaseOrderedList
 *
 * The base component of all OrderedList wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import List from '@material-ui/core/List';

import theme from '../../themes';

const StyledBaseOrderedList = styled(List)``;

function BaseOrderedList(props) {
  return <StyledBaseOrderedList>{props.children}</StyledBaseOrderedList>;
}

BaseOrderedList.defaultProps = {};

BaseOrderedList.propTypes = {
  children: T.any.isRequired,
};

export default BaseOrderedList;
