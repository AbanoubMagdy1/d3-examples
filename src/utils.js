export async function asyncHandler (func, params = {}) {
  try {
    const data = await func(params);
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

export function capitalize (str) {
  return str[0].toUpperCase() + str.substring(1);
}