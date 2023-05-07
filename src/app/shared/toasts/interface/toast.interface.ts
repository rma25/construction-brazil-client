export interface Toast {
  httpStatusCode: number;
  header: string;
  body: string;
  delay: number;
  isDanger?: boolean;
  isWarning?: boolean;
}
