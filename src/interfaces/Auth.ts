export interface IAuth {
  access_token: string;
  name?: string;
  lastname?: string;

  // for errors in the auth service
  message?: string;
  error?: string;
}
