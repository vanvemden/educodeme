import React from 'react';
import T from 'prop-types';
import { isEmpty } from 'lodash';

import { Spinner } from '../Output';

const BaseAsyncData = ({
  asyncData,
  component,
  errors,
  isLoading,
  propsToPassDown,
}) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (errors) {
    return 'An error has occurred in AsyncData component!';
  }
  if (!isEmpty(asyncData)) {
    const ComponentToRender = component;
    return <ComponentToRender data={asyncData} {...propsToPassDown} />;
  }
  return 'Nothing was rendered in AsyncData component!';
};

BaseAsyncData.propTypes = {
  asyncData: T.oneOfType([T.object, T.array]),
  component: T.oneOfType([T.func, T.object]).isRequired,
  errors: T.oneOfType([T.array]),
  isLoading: T.bool,
};

BaseAsyncData.defaultProps = {};

export default BaseAsyncData;
