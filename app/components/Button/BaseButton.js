import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledBaseButton = styled(Button)`
  margin: 1rem;
`;

function BaseButton({ label, onClick, ...restProps }) {
  return (
    <StyledBaseButton onClick={onClick} {...restProps}>
      {label}
    </StyledBaseButton>
  );
}

BaseButton.defaultProps = {
  onClick: () => {},
};

BaseButton.propTypes = {
  color: T.string,
  label: T.string.isRequired,
  onClick: T.func.isRequired,
  hasError: T.bool,
  errors: T.array,
  isDisabled: T.bool,
  isRequired: T.bool,
  variant: T.string,
};

export default BaseButton;
