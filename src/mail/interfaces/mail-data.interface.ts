export interface MailData<T = never> {
  name: string | null;
  to: string | null;
  data: T;
}
