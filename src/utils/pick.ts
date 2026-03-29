const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[],
): Partial<T> => {
  // Initialize an empty object to hold the picked properties
  const finalObj: Partial<T> = {};

  // Iterate over each requested key
  keys.forEach((key) => {
    // Ensure the key exists directly on the object (not on the prototype)
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  });

  // Return the resulting object with selected properties
  return finalObj;
};

export default pick;
