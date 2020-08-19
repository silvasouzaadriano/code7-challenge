export default interface IUpdateDebitDTO {
  id: string;
  client_id: number;
  client_name: string;
  reason: string;
  date: Date;
  amount: number;
}
