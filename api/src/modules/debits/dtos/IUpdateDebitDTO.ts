export default interface IUpdateDebitDTO {
  id: string;
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}
