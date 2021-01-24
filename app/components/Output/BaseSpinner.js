/*
 * BaseSpinner
 *
 * The base component of all Spinner outputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import theme from '../../themes';

const StyledBaseSpinner = styled(CircularProgress)``;

function BaseSpinner({ ...restProps }) {
  return <StyledBaseSpinner {...restProps} />;
}

BaseSpinner.defaultProps = {};

BaseSpinner.propTypes = {};

export default BaseSpinner;
