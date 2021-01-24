import styled from 'styled-components';
import BaseButton from './BaseButton';

import theme from '../../themes';

const SecondaryButton = styled(BaseButton)`
  &:hover {
    background-color: ${theme.colorSecondaryAlt};
  }

  background-color: ${theme.colorSecondary};
`;

export default SecondaryButton;
