/*
 * BaseTextarea
 *
 * The base component of all Textarea inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Textarea from '@material-ui/core/TextareaAutosize';

import theme from '../../themes';

const StyledBaseTextarea = styled(Textarea)``;

function BaseTextarea({ onClick, ...restProps }) {
  return <StyledBaseTextarea id="textarea" {...restProps} />;
}

BaseTextarea.defaultProps = {};

BaseTextarea.propTypes = {};

export default BaseTextarea;
