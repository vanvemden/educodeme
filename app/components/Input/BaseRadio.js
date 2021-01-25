/*
 * BaseRadio
 *
 * The base component of all Radio inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

// import theme from '../../themes';

const StyledBaseRadio = styled(Radio)``;

function BaseRadio({ ...restProps }) {
  return <StyledBaseRadio {...restProps} />;
}

BaseRadio.defaultProps = {};

BaseRadio.propTypes = {};

export default BaseRadio;
