export default interface ICreateDebitDTO {
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}
