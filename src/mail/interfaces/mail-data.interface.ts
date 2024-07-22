export interface MailData<T = never> {
  name: string | null| undefined;
  to: string | null| undefined;
  data: T;
}
