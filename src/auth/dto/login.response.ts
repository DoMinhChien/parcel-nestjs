export class LoginResponse {
  accessToken: string;
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.accessToken = token;
    this.refreshToken =  refreshToken;
  }
}
