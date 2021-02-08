/*
 * BaseInputLabel
 *
 * The base component of all InputLabels
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';

// import theme from '../../themes';

const StyledBaseInputLabel = styled(InputLabel)``;

function BaseInputLabel({ ...restProps }) {
  return <StyledBaseInputLabel id="email" type="email" {...restProps} />;
}

BaseInputLabel.defaultProps = {};

BaseInputLabel.propTypes = {};

export default BaseInputLabel;
