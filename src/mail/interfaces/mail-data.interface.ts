export interface MailData<T = never> {
  name: string | null;
  to: string;
  data: T;
}
