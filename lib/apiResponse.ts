export function successResponse<T>(data: T) {
  return {
    success: true,
    data,
  };
}

export function errorResponse(message: string) {
  return {
    success: false,
    error: message,
  };
}
export function notFoundResponse(message: string) {
  return {
    success: false,
    error: message,
    status: 404,
  };
}