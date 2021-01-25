/*
 * BaseNumber
 *
 * The base component of all Number inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// import theme from '../../themes';

const StyledBaseNumber = styled(TextField)``;

function BaseNumber({ onClick, ...restProps }) {
  return <StyledBaseNumber id="number" type="number" {...restProps} />;
}

BaseNumber.defaultProps = {};

BaseNumber.propTypes = {};

export default BaseNumber;
