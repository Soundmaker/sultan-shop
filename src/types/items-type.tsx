export default interface ItemsType {
  url: string,
  name: string,
  type: string, // "weight" | "volume" | "...",
  size: number,
  code: string, //  (Date.now()) at localstorage
  seller: string,
  brand: string,
  desc: string,
  price: number,
}
