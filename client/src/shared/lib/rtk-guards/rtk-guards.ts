import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// RTK error `FetchBaseQueryError`
export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

// Guard for errors with the structure { data: { message: string } }.
// Use this to safely access error.data.message after a server request.
export const isFetchErrorWithMessage = (
  error: unknown,
): error is { data: { message: string } } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as any).data?.message === 'string'
  );
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
