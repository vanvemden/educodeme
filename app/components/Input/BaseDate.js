/*
 * BaseDate
 *
 * The base component of all Date inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import theme from '../../themes';

const StyledBaseDate = styled(TextField)``;

function BaseDate({ ...restProps }) {
  return <StyledBaseDate id="time" type="time" {...restProps} />;
}

BaseDate.defaultProps = {};

BaseDate.propTypes = {};

export default BaseDate;
