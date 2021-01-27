/*
 * BaseList
 *
 * The base component of all ListItem wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';

import theme from '../../themes';

const Wrapper = styled(ListItem)``;

function BaseListItem(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

BaseListItem.defaultProps = {};

BaseListItem.propTypes = {
  children: T.any.isRequired,
};

export default BaseListItem;
