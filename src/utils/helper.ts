/**
 * This function will accept the two objects as arguments and return the object of deeply
 * merged with nested properties.
 * @param {object} targetObject objects containing the properties to be merged with source.
 * @param {object} sourceObject objects containing the properties you want to apply.
 * @return {object} return the deeply merged objects
 */
// eslint-disable-next-line import/prefer-default-export
export const deepMergeObject = (
  copyTargetObject = {},
  copySourceObject = {}
) => {
  // Iterating through all the keys of source object

  Object.keys(copySourceObject).forEach((key) => {
    if (
      typeof copySourceObject[key] === 'object' &&
      !Array.isArray(copySourceObject[key])
    ) {
      // If property has nested object, call the function recursively
      copyTargetObject[key] = deepMergeObject(
        copyTargetObject[key],
        copySourceObject[key]
      );
    } else {
      // else merge the object source to target
      copyTargetObject[key] = copySourceObject[key];
    }
  });

  return copyTargetObject;
};
