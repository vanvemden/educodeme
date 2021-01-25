/*
 * BaseSearch
 *
 * The base component of all Search inputs
 *
 */

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// import theme from '../../themes';

const StyledBaseSearch = styled(TextField)``;

function BaseSearch({ onClick, ...restProps }) {
  return <StyledBaseSearch id="search" type="search" {...restProps} />;
}

BaseSearch.defaultProps = {};

BaseSearch.propTypes = {};

export default BaseSearch;
