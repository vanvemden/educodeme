/**
 * @description Check if Session Id is valid
 * @param {string} id
 * @return {boolean} True if valid
 */
export const isValidSessionId = id => {
  const UUID4_REGEXP = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/,
    'i',
  );
  return UUID4_REGEXP.test(id);
};
