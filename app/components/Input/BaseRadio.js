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

import theme from '../../themes';

const StyledBaseRadio = styled(Radio)``;

function BaseRadio({ onClick, label, ...restProps }) {
  return <StyledBaseRadio onClick={onClick} {...restProps} />;
}

BaseRadio.defaultProps = {};

BaseRadio.propTypes = {
  onClick: T.func.isRequired,
};

export default BaseRadio;
