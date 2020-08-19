export default interface ICreateDebitDTO {
  client_id: number;
  client_name: string;
  reason: string;
  date: Date;
  amount: number;
}
