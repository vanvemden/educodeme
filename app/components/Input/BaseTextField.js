/*
 * BaseTextField
 *
 * The base component of all Text inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// import theme from '../../themes';

const StyledBaseTextField = styled(TextField)``;

function BaseTextField({ id, onClick, ...restProps }) {
  return <StyledBaseTextField id={id} type="text" {...restProps} />;
}

BaseTextField.defaultProps = {};

BaseTextField.propTypes = {
  id: T.string.isRequired,
};

export default BaseTextField;
