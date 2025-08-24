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

export type UserData = {
  _id: string;

  createdAt: string;
  roles: string[];
  updatedAt: string;
  userMail: string;
  userName: string;
  userType: 'client' | 'author';
};

export interface IResponse {
  message: string;
  userData: UserData;
}
