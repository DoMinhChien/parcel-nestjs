export class APIResponse {
  StatusCode: number;
  Message: string;

  constructor(statusCode: number, message: string) {
    this.StatusCode = statusCode;
    this.Message = message ?? this.GetDefaultMessageForStatusCode(statusCode);
  }

  GetDefaultMessageForStatusCode(statusCode: number) {
    switch (statusCode) {
      case 400:
        return 'A bad request';
      case 401:
        return 'Authorized, you are not';
      case 500:
        return 'Errors are the path to the dark side. Errors lead to anger.  Anger leads to hate.  Hate leads to career change';
      default:
        break;
    }
    return '';
  }
}
