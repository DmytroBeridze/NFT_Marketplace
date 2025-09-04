import { extractErrorKey } from './extractErrorKey';

export const getFieldErrorClass = (error: any, fieldName: string) => {
  const errorKey = extractErrorKey(error);

  const ERROR_CLASS = '!border border-red-500';

  const map: Record<string, string> = {
    userNotFound: 'userName',
    incorrectPassword: 'userPass',
    usernameExists: 'userName',
    mailExists: 'userMail',
  };

  if (errorKey && map[errorKey] === fieldName) {
    return ERROR_CLASS;
  }

  return '';
  // switch (errorKey) {
  //   case 'userNotFound':
  //     return fieldName === 'userName' ? ERROR_CLASS : '';
  //   case 'incorrectPassword':
  //     return fieldName === 'userPass' ? ERROR_CLASS : '';
  //   case 'usernameExists':
  //     return fieldName === 'userName' ? ERROR_CLASS : '';
  //   case 'mailExists':
  //     return fieldName === 'userMail' ? ERROR_CLASS : '';
  //   default:
  //     return '';
  // }
};
