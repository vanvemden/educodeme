/*
 * BaseRange
 *
 * The base component of all Range inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

// import theme from '../../themes';

const StyledBaseRange = styled(Slider)``;

function BaseRange({ onClick, label, ...restProps }) {
  return <StyledBaseRange onClick={onClick} {...restProps} />;
}

BaseRange.defaultProps = {};

BaseRange.propTypes = {
  min: T.number.isRequired,
  max: T.number.isRequired,
};

export default BaseRange;
