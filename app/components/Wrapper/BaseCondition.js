/*
 * BaseCondition
 *
 * The base component of all Condition wrappers
 *
 */

import React from 'react';
import T from 'prop-types';

function BaseCondition({
  ComponentOnTrue,
  ComponentOnFalse,
  propsToPassDown,
  ifTrue,
}) {
  if (ifTrue) {
    if (typeof ComponentOnTrue === 'function') {
      return <ComponentOnTrue {...propsToPassDown} />;
    }
    return ComponentOnTrue;
  }
  if (ComponentOnFalse) {
    if (typeof ComponentOnFalse === 'function') {
      return <ComponentOnFalse {...propsToPassDown} />;
    }
    return ComponentOnFalse;
  }
  return null;
}

BaseCondition.propTypes = {
  ComponentOnTrue: T.object,
  ComponentOnFalse: T.object,
  propsToPassDown: T.object,
  ifTrue: T.bool.isRequired,
};

export default BaseCondition;
