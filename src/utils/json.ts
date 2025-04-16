/**
 * Extract all values from a JSON object
 * @param obj - The JSON object to extract values from
 * @returns An array of all values in the JSON object
 */
export const extractJSONValues = (obj: any): string[] =>
  Object.keys(obj).reduce<string[]>((acc: string[], key: string) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const values = extractJSONValues(obj[key]);
      values.forEach((value) => {
        if (!acc.includes(value)) {
          acc.push(value);
        }
      });
    } else if (!acc.includes(obj[key])) {
      acc.push(obj[key]);
    }

    return acc;
  }, []);

/**
 * Traverse a JSON object and apply a callback to each value
 * @param obj - The JSON object to traverse
 * @param cb - The callback to apply to each value
 * @returns The modified JSON object
 */
export const traverseJSON = (obj: any, cb: (text: string) => string): any =>
  Object.keys(obj).reduce<any>((acc: any, key: string) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      acc[key] = traverseJSON(obj[key], cb);
    } else {
      acc[key] = cb(obj[key]);
    }
    return acc;
  }, {});
