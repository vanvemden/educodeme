/*
 * BaseSignalIndicator
 *
 * The base component of all Spinner outputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

import theme from '../../themes';

const StyledBaseSignalIndicator = styled(Radio)``;

function BaseSignalIndicator({ ...restProps }) {
  return <StyledBaseSignalIndicator {...restProps} />;
}

BaseSignalIndicator.defaultProps = {};

BaseSignalIndicator.propTypes = {
  isOn: T.bool.isRequired,
  label: T.string.isRequired,
};

export default BaseSignalIndicator;
