/*
 * BaseText
 *
 * The base component of all Text inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// import theme from '../../themes';

const StyledBaseText = styled(TextField)``;

function BaseText({ onClick, ...restProps }) {
  return <StyledBaseText id="text" type="text" {...restProps} />;
}

BaseText.defaultProps = {};

BaseText.propTypes = {};

export default BaseText;
