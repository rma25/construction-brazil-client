import { ToastType } from '../enums/toast-type.enum';

export interface Toast {
  httpStatusCode: number;
  header: string;
  body: string;
  delay: number;
  type: ToastType;
}
