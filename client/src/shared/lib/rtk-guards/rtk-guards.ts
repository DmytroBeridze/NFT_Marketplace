import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// RTK error `FetchBaseQueryError`
export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

// server error  object with a string 'message' property
export const isErrorWithMessage = (
  error: unknown,
): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
};
