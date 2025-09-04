import {
  isErrorWithMessage,
  isFetchBaseQueryError,
  isFetchErrorWithMessage,
} from '../../../shared/lib/rtk-guards';

type Errors =
  | 'usernameExists'
  | 'mailExists'
  | 'roleNotFound'
  | 'registrationError'
  | 'userNotFound'
  | 'incorrectPassword'
  | 'loginError'
  | 'accessDenied'
  | 'noAccessToken'
  | 'usernameIsRequired'
  | 'passwordIsRequired'
  | 'passwordLength'
  | 'unknownError'
  | string;

export const extractErrorKey = (error: any) => {
  // error message
  let errorKey: Errors | undefined;

  if (isFetchBaseQueryError(error) && isFetchErrorWithMessage(error)) {
    errorKey = error.data.message as Errors;
  }

  if (isErrorWithMessage(error)) {
    errorKey = error.message as Errors;
  }

  return errorKey;
};
