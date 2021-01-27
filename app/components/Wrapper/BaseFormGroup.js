/*
 * BaseFormGroup
 *
 * The base component of all FormGroup wrappers
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';

import theme from '../../themes';

const Wrapper = styled(FormGroup)``;

function BaseFormGroup({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

BaseFormGroup.defaultProps = {};

BaseFormGroup.propTypes = {
  children: T.any.isRequired,
};

export default BaseFormGroup;
