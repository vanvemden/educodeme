/*
 * BaseEmail
 *
 * The base component of all Email inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// import theme from '../../themes';

const StyledBaseEmail = styled(TextField)``;

function BaseEmail({ ...restProps }) {
  return <StyledBaseEmail id="email" type="email" {...restProps} />;
}

BaseEmail.defaultProps = {};

BaseEmail.propTypes = {};

export default BaseEmail;
