import styled from 'styled-components';
import { ViewColumnRounded } from '@material-ui/icons';

const StyledButton = styled(ViewColumnRounded)`
  transform: rotate(${props => (props.direction === 'row' ? '90deg' : '0deg')});
`;

export default StyledButton;
