import styled from 'styled-components';

import { Container as BaseContainer } from '../../../components/Wrapper';

const StyledContainer = styled(BaseContainer)`
  flex-grow: 1;
  width: ${props => props.width};
`;

export default StyledContainer;
