/**
 * @description Returns an object with the action container, component, type.
 * @param {string} The action  string
 * @return {object} Object with action root, group, container, type
 */
export const decomposeActionType = type => {
  const [root, group, container, activity] = type.split('/');
  return { root, group, container, activity };
};
