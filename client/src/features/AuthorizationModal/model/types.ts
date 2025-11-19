import type { UserData } from '../../../entities/user/model';

// контракт для типізації  initialValues в SignUpForm
export interface RegisterValues {
  userName: string;
  userMail: string;
  userPass: string;
  userconfirmPass: string;
  userType: 'author' | 'client' | '';
}

// контракт для даних що відправляються в authSlice
export type RegisterRequest = Omit<RegisterValues, 'userconfirmPass'>;

// контракт для типізації  initialValues в LoginForm
export type LoginValues = Omit<
  RegisterValues,
  'userMail' | 'userconfirmPass' | 'userType'
>;

export interface IRegisterResponse {
  message: string;
  userData: UserData;
}
export interface ILoginResponse {
  message: string;
  userData: UserData;
  token: string;
}
// export interface IGetMeResponse {
//   message: string;
//   userData: UserData;
// }
