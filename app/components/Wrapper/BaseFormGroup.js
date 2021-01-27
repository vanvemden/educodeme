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

function BaseFormGroup(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

BaseFormGroup.defaultProps = {};

BaseFormGroup.propTypes = {
  children: T.any.isRequired,
};

export default BaseFormGroup;
