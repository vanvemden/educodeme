/*
 * BaseCheckbox
 *
 * The base component of all Checkbox inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

// import theme from '../../themes';

const StyledBaseCheckbox = styled(Checkbox)``;

function BaseCheckbox({ onClick, label, ...restProps }) {
  return (
    <StyledBaseCheckbox onClick={onClick} {...restProps}>
      {label}
    </StyledBaseCheckbox>
  );
}

BaseCheckbox.defaultProps = {};

BaseCheckbox.propTypes = {
  onClick: T.func.isRequired,
};

export default BaseCheckbox;
