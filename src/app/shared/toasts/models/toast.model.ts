export class Toast {
  constructor(
    httpStatusCode: number,
    header: string,
    body: string,
    delay: number,
    isDanger: boolean,
    isWarning: boolean
  ) {
    this.httpStatusCode = httpStatusCode;
    this.header = header;
    this.body = body;
    this.delay = delay;
    this.isDanger = isDanger;
    this.isWarning = isWarning;
  }

  public httpStatusCode: number;
  public header: string;
  public body: string;
  public delay: number;
  public isDanger: boolean;
  public isWarning: boolean;
}
