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

const Wrapper = styled(FormControl)``;

function BaseFormControl({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

BaseFormControl.defaultProps = {};

BaseFormControl.propTypes = {
  children: T.any.isRequired,
};

export default BaseFormControl;
