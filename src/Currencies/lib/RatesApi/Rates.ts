export default interface Rates {
  base: string;
  date: string;
  rates: {
    [currency: string]: number;
  };
}
