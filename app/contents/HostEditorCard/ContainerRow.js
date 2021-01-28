import styled from 'styled-components';

import { ContainerRow as BaseContainerRow } from '../../components/Wrapper';

const StyledContainerRow = styled(BaseContainerRow)`
  flex-direction: ${props => props.flexDirection};
`;

export default StyledContainerRow;
