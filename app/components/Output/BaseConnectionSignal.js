/*
 * BaseConnectionSignal
 *
 * The base component of all Spinner outputs
 *
 */

import React, { Fragment } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

import theme from '../../themes';

const StyledBaseConnectionSignal = styled(Radio)``;

function BaseConnectionSignal({
  isConnected,
  isHost,
  isReceiving,
  isSending,
  ...restProps
}) {
  return (
    <Fragment>
      <StyledBaseConnectionSignal
        checked={isConnected && (!isSending && !isReceiving)}
        disabled={!isConnected}
        {...restProps}
      />
      {isHost ? 'send' : 'receive'}
    </Fragment>
  );
}

BaseConnectionSignal.defaultProps = {};

BaseConnectionSignal.propTypes = {
  isConnected: T.bool.isRequired,
  isHost: T.bool.isRequired,
  isReceiving: T.bool.isRequired,
  isSending: T.bool.isRequired,
};

export default BaseConnectionSignal;
