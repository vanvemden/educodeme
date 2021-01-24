/*
 * BaseFormControl
 *
 * The base component of all FormControl wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

import theme from '../../themes';

const StyledBaseFormControl = styled(FormControl)``;

function BaseFormControl(props) {
  return <StyledBaseFormControl>{props.children}</StyledBaseFormControl>;
}

BaseFormControl.defaultProps = {};

BaseFormControl.propTypes = {
  children: T.any.isRequired,
};

export default BaseFormControl;
