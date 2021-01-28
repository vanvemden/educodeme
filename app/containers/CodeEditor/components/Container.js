import styled from 'styled-components';

import { Container } from '../../../components/Wrapper';

const StyledContainer = styled(Container)`
  flex-grow: 1;
  width: ${props => props.width};
`;

export default StyledContainer;
