import styled from 'styled-components';
import BaseButton from './BaseButton';
import theme from '../../themes';

const PrimaryButton = styled(BaseButton)`
  &:hover {
    background-color: ${theme.colorPrimaryAlt};
  }

  background-color: ${theme.colorPrimary};
`;

export default PrimaryButton;
