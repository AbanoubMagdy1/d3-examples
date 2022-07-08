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

export function numberWithCommas (num) {
  if (!num) {
    return 0;
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}