/*
 * BasePassword
 *
 * The base component of all Password inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import theme from '../../themes';

const StyledBasePassword = styled(TextField)``;

function BasePassword({ ...restProps }) {
  return <StyledBasePassword id="password" type="password" {...restProps} />;
}

BasePassword.defaultProps = {};

BasePassword.propTypes = {};

export default BasePassword;
