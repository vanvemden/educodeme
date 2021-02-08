/**
 * Asynchronously loads the component for HostPage
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
