export interface ICreateProductOrderDTO {
  order_id?: string;
  product_id: string;
  product_amount: number;
  total_product_price: number;
}
