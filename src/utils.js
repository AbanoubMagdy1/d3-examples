export async function asyncHandler (func, params = {}) {
  try {
    const data = await func(params);
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}