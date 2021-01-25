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

// import theme from '../../themes';

const StyledBaseTextarea = styled(Textarea)``;

function BaseTextarea({ value, ...restProps }) {
  return <StyledBaseTextarea id="textarea" value={value} {...restProps} />;
}

BaseTextarea.defaultProps = {};

BaseTextarea.propTypes = {
  rows: T.oneOfType([T.number, T.string]),
  rowsMax: T.oneOfType([T.number, T.string]),
  rowsMin: T.oneOfType([T.number, T.string]),
  value: T.string.isRequired,
};

export default BaseTextarea;
